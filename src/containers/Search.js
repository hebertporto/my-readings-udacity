import React, { PureComponent  } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'halogen/ClipLoader'

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
      this.setBooksList(books)
      this.setState({
        booksInShelf: books,
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

  handleChange = (event) =>  {
    let updatedList = this.state.books
    updatedList = updatedList.filter(book => (
      book.title.toLowerCase().search(
       event.target.value.toLowerCase()
      ) !== -1
   ))
    this.setState({ booksFiltered: updatedList })
  }

  keyPress = (event) => {
    const { booksInShelf } = this.state
    if(event.keyCode === 13){
      api.search(event.target.value, '10')
        .then(searchResult => {
          if(Array.isArray(searchResult)) {
            const result = searchResult.map((book) => {
              const newBook = booksInShelf.find(b => b.id !== book.id)
              return newBook ? newBook : book
            })
            this.setBooksList(result)
          }
        })
    }
  }

  updateBookShelf = (book, shelf) => {
    api.update(book, shelf)
      .then(res => {
        this.setState({
          booksFiltered: [],
          loading: true,
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
    const { booksFiltered, loading } = this.state
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.handleChange}
                onKeyDown={this.keyPress}
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
