import React from 'react';
import Books from './Books';

const BookShelf = ({ shelfBooks, onChangeShelf }) => {
  return (
    <div className="bookshelf-books">
      <Books shelfBooks={shelfBooks} onChangeShelf={onChangeShelf}></Books>
    </div>
  )
}

export default BookShelf;
