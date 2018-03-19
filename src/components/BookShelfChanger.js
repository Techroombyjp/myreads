import React, { Component } from 'react';

class BookShelfChanger extends Component {
  state = {
    value: 'none'
  }
  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.onChangeShelf(event.target.value)
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={ this.props.shelf } onChange={(event) => this.handleChange(event)}>
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
