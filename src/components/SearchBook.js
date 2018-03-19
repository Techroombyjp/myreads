import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelfChanger from './BookShelfChanger';


class SearchBook extends Component {
  handleChange = (book, newShelf) => {
    this.props.onChangeShelf(book, newShelf);
  }
  handleInputChange = (event) => {
    this.props.onChange(event.target.value);
  }
  render() {
    const { result } = this.props;

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
              onChange={ (event) => this.handleInputChange(event) }
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
