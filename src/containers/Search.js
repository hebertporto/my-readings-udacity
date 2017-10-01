import React from 'react'
import { Link } from 'react-router-dom'

import Book from './../components/Book'
import * as api from './../BooksAPI'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      booksFiltered: [],
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.setBooksList = this.setBooksList.bind(this)
  }

  componentDidMount() {
    api.getAll().then(books =>{
      this.setBooksList(books)
    })
  }
  setBooksList(books) {
    this.setState({
      books: books,
      booksFiltered: books,
    })
  }

  handleChange(event) {
    let updatedList = this.state.books
    updatedList = updatedList.filter((book) => {
      return book.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    })
    this.setState({ booksFiltered: updatedList })
  }

  render() {
    const { booksFiltered } = this.state
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <Book books={booksFiltered} />
          </div>
        </div>
      </div>
    )
  }
}

export default Search
