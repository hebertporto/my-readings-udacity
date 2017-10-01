import React from 'react'
import Book from './../components/Book'
import { Link } from 'react-router-dom'

import './App.css'
import * as api from './../BooksAPI'
import _ from 'lodash'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    currentlyBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  }
  constructor(props) {
    super(props)
    this.filterBooksByShelf = this.filterBooksByShelf.bind(this)
  }

  componentDidMount() {
    api.getAll().then(books => {
      this.filterBooksByShelf(books)
    })
  }

  filterBooksByShelf(books) {
    const groupedBooks = _.groupBy(books, 'shelf')
    this.setState({
      readBooks: groupedBooks['read'],
      currentlyBooks: groupedBooks['currentlyReading'],
      wantToReadBooks: groupedBooks['wantToRead'],
    })
  }

  render() {
    const { currentlyBooks, wantToReadBooks, readBooks } = this.state
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
                    <Book books={currentlyBooks} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Book books={wantToReadBooks} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Book books={readBooks} />
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
