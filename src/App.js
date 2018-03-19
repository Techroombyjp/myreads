import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import _array from 'lodash/array';
import * as BooksAPI from './BooksAPI';
import MainPage from './components/MainPage';
import SearchBook from './components/SearchBook';
import './App.css';


class BooksApp extends Component {
  state = {
    books: [],
    result: [],
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
  objDigger = (arr, diggers) => {
    const digged = [];
    diggers.forEach((d) => {
      let o = {};
      o = arr.filter((a) => a.id === d);
      o.forEach((i) => {
        digged.push(i);
      })
    });
    return digged;
  }
  filterHelper = (result) => {
    const resultKeys = result.map((r) => r.id)
    const stateKeys = this.state.books.map((s) => s.id)
    // this.objDigger(this.state.books, stateKeys)

    // new books
    const newKeys = _array.difference(resultKeys, stateKeys);
    const newObjs = this.objDigger(result, newKeys)

    // existing books
    const existingKeys = _array.difference(resultKeys, newKeys)
    const existingObjs = this.objDigger(this.state.books, existingKeys);

    // search books
    const searchObjs = newObjs.concat(existingObjs);
    return searchObjs;
  }
  searchBook = (query) => {
    BooksAPI.search(query).then((result) => {
      result = this.filterHelper(result)
      if (!result.error) {
        this.setState({
          result,
        })
      } else {
        this.setState({result: []})
      }
    })
    .catch((err) => {
      this.setState({result: []})
    })
  }
  appHandleChange = (query) => {
    this.searchBook(query);
    // if(query) {
    //   console.log('searching');
    //   this.searchBook(query);
    // } else {
    //   console.log('empty');
    //   // this.setState(state => ({
    //   //   result: []
    //   // }))
    //   this.setState(newSearch())

  }
  componentWillUpdate() {
    console.log('update')
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
          <SearchBook
            result={ this.state.result }
            onChange={ this.appHandleChange }
            onChangeShelf={ this.changeShelf }/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
