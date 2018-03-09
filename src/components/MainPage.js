import React from 'react';
import { Link } from 'react-router-dom';
import BookShelfList from './BookShelfList';

const MainPage = ({ books, onChangeShelf }) => {
  const getShelfList = (shelfDescriptions) => {
    return shelfDescriptions = [
      { title: 'Currently Reading', id: 'currentlyReading' },
      { title: 'Want to Read', id: 'wantToRead' },
      { title: 'Read', id: 'read' }
    ];
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelfList
          shelfList={getShelfList()}
          books={books}
          onChangeShelf={onChangeShelf}
        />
      </div>
      <div className="open-search">
        <Link
          to="/search"
          className="add-book"
        >
          Add Book
        </Link>
      </div>
    </div>
  )
}

export default MainPage;
