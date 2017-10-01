import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Loader from 'halogen/ClipLoader'

import * as api from './../BooksAPI'

import Book from './../components/Book'
import If from './../components/If'

import './App.css'

class BooksApp extends Component {
  state = {
    showSearchPage: false,
    loading: true,
    currentlyBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    api.getAll().then(books => this.filterBooksByShelf(books))
  }

  filterBooksByShelf = (books) => {
    const { read, wantToRead, currentlyReading } = _.groupBy(books, 'shelf')
    this.setState({
      readBooks: read ? read : false,
      currentlyBooks: currentlyReading ? currentlyReading : false,
      wantToReadBooks: wantToRead ? wantToRead : false,
      loading: false,
    })
  }

  updateBookShelf = (book, shelf) => {
    api.update(book,shelf).then(this.getAllBooks)
  }

  renderSpinner() {
    return (
      <div>
        <Loader color="#26A65B" size="25px" margin="4px"/>
      </div>
    )
  }

  render() {
    const { currentlyBooks, wantToReadBooks, readBooks, loading } = this.state
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Book books={currentlyBooks} updateBookd={this.updateBookShelf} />
                    <If test={loading}>
                        {this.renderSpinner()}
                    </If>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Book books={wantToReadBooks} updateBookd={this.updateBookShelf} />
                    <If test={loading}>
                        {this.renderSpinner()}
                    </If>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Book books={readBooks} updateBookd={this.updateBookShelf} />
                    <If test={loading}>
                        {this.renderSpinner()}
                    </If>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
