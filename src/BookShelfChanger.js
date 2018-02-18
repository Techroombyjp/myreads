import React, { Component } from 'react';

class BookShelfChanger extends Component {
  state = {
    value: ''
  }
  handleChange = (event) => {
    console.log('change')
    this.setState({value: event.target.value})
    this.props.onChangeShelf(this.props.book, event.target.value)
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={(event) => this.handleChange(event)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger;
