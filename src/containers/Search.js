import React from 'react'
import Book from './../components/Book'

class Search extends React.Component {

  render() {
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <Book books={[]} />
          </div>
        </div>
      </div>
    )
  }
}

export default Search
