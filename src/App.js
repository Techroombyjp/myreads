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
  componentDidMount() {
    this.getBooks();
  }
  changeShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
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
          <SearchBook books={ this.state.books } onChangeShelf={this.changeShelf}/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
