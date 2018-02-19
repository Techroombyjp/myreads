import React, { Component } from 'react';
import BookShelf from './BookShelf';

class BookShelfList extends Component {
  filterBooks = (shelf) => {
    return this.props.books.filter((book) => {
      return book.shelf === shelf;
    })
  }
  render() {
    return (
      <div>
        {this.props.shelfList.map((shelf) => (
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <BookShelf
              shelfBooks={this.filterBooks(shelf.id)}
              onChangeShelf={this.props.onChangeShelf}
            >
            </BookShelf>
          </div>
        ))}
      </div>
    )
  }
}

export default BookShelfList;
