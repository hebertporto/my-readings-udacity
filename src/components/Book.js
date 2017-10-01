import React, { Component } from 'react'

class Book extends Component {
  state = {
    value: 'moveTo',
  }

  constructor(props) {
    super(props)
    this.changeSelect = this.changeSelect.bind(this)
  }
  changeSelect(event, book) {
    console.log('muda select', event.target.value)
    this.props.updateBookd(book, event.target.value)
    this.setState({value: event.target.value});
  }
  setSelectValue(value) {
    this.setState({
      value
    })
  }

  render() {
    const { books } = this.props
    return (
      <ol className="books-grid">
        {books.map((book, index) => {
          return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                <div className="book-shelf-changer">
                  <select  onChange={(e) => this.changeSelect(e, book)} value={book.shelf ? book.shelf : this.state.value}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        )})}
      </ol>
    )
  }
}

export default Book
