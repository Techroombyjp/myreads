import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';

class Books extends Component {
  handleChange = (book, newShelf) => {
    this.props.onChangeShelf(book, newShelf);
  }
  render() {
    return (
      <ol className="books-grid">
        {this.props.shelfBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <BookShelfChanger
                  shelf={book.shelf}
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
    )
  }
}

export default Books;
