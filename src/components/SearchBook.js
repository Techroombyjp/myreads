import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
// import escapeRegExp from 'escape-string-regexp';
import BookShelfChanger from './BookShelfChanger';
import _array from 'lodash/array';

class SearchBook extends Component {
  state = {
    query: '',
    result: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  objDigger = (arr, diggers) => {
    const digged = [];
    diggers.forEach((d) => {
      let o = {};
      o = arr.filter((a) => a.id === d);
      o.forEach((i) => {
        digged.push(i);
      })
    });
    return digged;
  }
  filterHelper = (result) => {
    const resultKeys = result.map((r) => r.id)
    const stateKeys = this.props.books.map((s) => s.id)
    // this.objDigger(this.props.books, stateKeys)

    // new books
    const newKeys = _array.difference(resultKeys, stateKeys);
    const newObjs = this.objDigger(result, newKeys)

    // existing books
    const existingKeys = _array.difference(resultKeys, newKeys)
    const existingObjs = this.objDigger(this.props.books, existingKeys);

    // // search books
    const searchObjs = newObjs.concat(existingObjs);
    return searchObjs;
  }

  searchBook = (query) => {
    this.updateQuery(query);
    if (query) {
      BooksAPI.search(query).then((result) => {
        result = this.filterHelper(result)
        // second part contains books that are new
        if (!result.error) {
          this.setState({
            result,
          })
        }
      })
    } else {
      this.setState({result: []});
    }
  }
  handleChange = (book, newShelf) => {
    this.props.onChangeShelf(book, newShelf);
  }
  render() {
    const { result } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBook(event.target.value)}
            />

          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {result.length>0 && result.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
                    <BookShelfChanger
                      shelf={book.shelf ? book.shelf : 'none'}
                      onChangeShelf={(newShelf) => {
                        this.handleChange(book, newShelf)
                      }}
                    ></BookShelfChanger>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;
