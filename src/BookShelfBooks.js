import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';

class BookShelfBooks extends Component {
  render() {
    return (
      <div className="bookshelf-books">
      <ol className="books-grid">
        {this.props.books.map((book) => (
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
    )
  }
}

export default BookShelfBooks;
