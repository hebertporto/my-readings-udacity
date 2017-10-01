import React, { PureComponent } from 'react'

const styles = {
  cover: {
    width: 128,
    height: 193,
  }
}

class Book extends PureComponent {
  state = {
    value: 'moveTo',
  }

  changeSelect = (event, book) => {
    this.props.updateBookd(book, event.target.value)
    this.setState({value: event.target.value});
  }

  setValue = value => this.setState({ value })

  render() {
    const { books } = this.props

    if(!books) return <span>No books here!</span>

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
                    ...styles.cover,
                    backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}
                >
                </div>
                <div className="book-shelf-changer">
                  <select
                    onChange={(e) => this.changeSelect(e, book)}
                    value={book.shelf ? book.shelf : this.state.value}
                  >
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
