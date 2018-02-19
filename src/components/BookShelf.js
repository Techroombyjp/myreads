import React, { Component } from 'react';
import Books from './Books';

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf-books">
        <Books shelfBooks={this.props.shelfBooks} onChangeShelf={this.props.onChangeShelf}></Books>
      </div>
    )
  }
}

export default BookShelf;
