import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import MainPage from './components/MainPage';
import SearchBook from './components/SearchBook';

class BooksApp extends Component {
  state = {
    books: []
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.setState((prevState) => {
        let filteredBooks = prevState.books.filter((b) => b.id !== book.id);
        let updatedBook = book;
        updatedBook.shelf = shelf;
        let updatedBooks = [...filteredBooks, updatedBook];
        return {books: updatedBooks}
      })
    })
  }
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }
  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchBook onChangeShelf={this.changeShelf}/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
