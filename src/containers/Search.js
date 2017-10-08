import React, { PureComponent  } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'halogen/ClipLoader'
import _ from 'lodash'
import * as api from './../BooksAPI'

import Book from './../components/Book'
import If from './../components/If'


class Search extends PureComponent {
  state = {
    booksInShelf: [],
    books: [],
    booksFiltered: [],
    value: '',
    loading: true,
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    api.getAll().then(books => {
      this.setState({
        booksInShelf: books,
        loading: false,
      })
    })
  }

  setBooksList = (books) => {
    this.setState({
      books: books,
      booksFiltered: books,
      loading: false,
    })
  }

  handleChange = (value) => {
    this.setState({ value })
    this.searchApi(value)
  }

  searchApi = _.debounce((value) => {
    this.setState({ loading: true })
    api.search(value, '10')
    .then(searchResult => {
      if(Array.isArray(searchResult)) {
        const result = searchResult.map((book) => {
          const newBook = this.state.booksInShelf.find(b => b.id === book.id)
          return newBook ? newBook : book
        })
        this.setBooksList(result)
      }
    })
  }, 1500)

  updateBookShelf = (book, shelf) => {
    api.update(book, shelf)
      .then(res => {
        this.setState({
          booksFiltered: [],
          loading: true,
          value: '',
        })
        this.getAllBooks()
      })
  }

  renderSpinner() {
    return (
      <div className="search-center-loading">
        <Loader color="#26A65B" size="25px" margin="4px"/>
      </div>
    )
  }
  render() {
    const { booksFiltered, loading, value } = this.state
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.handleChange(e.target.value)}
                value={value}
              />
            </div>
          </div>
          <div className="search-books-results">
            <Book books={booksFiltered} updateBookd={this.updateBookShelf} />
            <If test={loading}>
                {this.renderSpinner()}
            </If>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
