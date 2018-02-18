import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import BookShelfChanger from './BookShelfChanger';

class SearchBook extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }
  render() {
    const { books } = this.props;
    const { query } = this.state;

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title));
    } else {
      showingBooks = [];
    }

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
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                  <BookShelfChanger
                    book={book}
                    onChangeShelf={this.props.changeShelf}
                  ></BookShelfChanger>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
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
