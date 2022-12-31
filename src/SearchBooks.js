import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
    state = {
        query: '',
        myBooks: [],
        searchResults: [],
    }

    getUpdatedBookList = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({ myBooks: books })
            })
    }

    componentDidMount() {
        this.getUpdatedBookList()
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
        this.setState({ searchResults: []})
        if (query) {
            BooksAPI.search(query)
                .then((response) => {
                    if (response.length > 0) {
                        this.setState({ searchResults: response })
                    } else {
                        this.setState({ searchResults: [] })
                    }
                })
        }
    }

    updateResultShelf = () => {
        this.state.searchResults.map((book) => {
            let myBook = this.state.myBooks.find(b => b.id === book.id)
            if (myBook) {
                book.shelf = myBook.shelf
            } else {
                book.shelf = "none"
            }
            return book
        })
    }

    updateBookshelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((response) => {
                this.getUpdatedBookList()
            })
    }

    render() {
        this.updateResultShelf()
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map((book) => (
                            <Book key={book.id} book={book} changeBookshelf={this.updateBookshelf} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks