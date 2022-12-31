import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class ListBooks extends Component {
    state = {
        myBooks: [],
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

    updateBookshelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(response => {
                this.getUpdatedBookList()
            })
    }

    render() {
        const currentlyReading = this.state.myBooks.filter((b) => b.shelf==='currentlyReading')
        const wantToRead = this.state.myBooks.filter((b) => b.shelf==='wantToRead')
        const read = this.state.myBooks.filter((b) => b.shelf==='read')
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReading.map((book) => (
                                        <Book key={book.id} book={book} changeBookshelf={this.updateBookshelf}/>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead.map((book) => (
                                        <Book key={book.id} book={book} changeBookshelf={this.updateBookshelf}/>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read.map((book) => (
                                        <Book key={book.id} book={book} changeBookshelf={this.updateBookshelf}/>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default ListBooks