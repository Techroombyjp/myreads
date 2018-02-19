import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import BookShelfChanger from './BookShelfChanger';

class SearchBook extends Component {
  state = {
    query: '',
    result: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  searchBook = (query) => {
    let showingBooks = [];
    const match = new RegExp(escapeRegExp(query), 'i');
    this.updateQuery(query);
    if (query) {
      BooksAPI.search(query).then((response) => {
        console.log(response)
        if (!response.error) {
          showingBooks = response.filter((book) => match.test(book.title));
          this.setState({result: showingBooks});
        }
      })
    } else {
      console.log('no query')
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
            {result.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
