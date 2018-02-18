import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBook from './SearchBook';
import BookShelfBooks from './BookShelfBooks';
import { Link }  from 'react-router-dom';

class BooksApp extends Component {
  state = {
    books: [],
    shelfDescriptions : [
      {title: 'Currently Reading', id: 'currentlyReading'},
      {title: 'Want to Read', id: 'wantToRead'},
      {title: 'Read', id: 'read'}
    ]
  }
  filterBooks = (shelf) => {
    return this.state.books.filter((book) => {
      return book.shelf === shelf;
    })
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.getBooks();
    })
  }
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.state.shelfDescriptions.map((shelf) => (
                <div className="bookshelf" key={shelf.id}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <BookShelfBooks
                    books={this.filterBooks(shelf.id)}
                    changeShelf={this.changeShelf}
                    >
                  </BookShelfBooks>
                </div>
              ))}
            </div>
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
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchBook
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
