import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as BooksAPI from './BooksAPI'
import BookList from "./BookList";
import PropTypes from "prop-types";
import { Debounce } from 'react-throttle';

class Search extends Component {
    static propTypes = {
        onSetShelf: PropTypes.func.isRequired
    };

    state = {
        searchQuery: '',
        searchResults: [],
        alreadySearched: false,
        loadingResults: false
    };
    
    updateBookShelves = () => {
        const { searchResults } = this.state;
        const { allBooks } = this.props;
        if (searchResults && searchResults.length > 0) {
            searchResults.forEach((element, index, array) => {
                let find = allBooks.find(book => book.id === array[index].id);
                if (typeof find !== 'undefined') {
                    searchResults[index].shelf = find.shelf;
                }
            });
        }
    };

    searchBooks = (query) => {
        this.setState({
            loadingResults: true
        });
        BooksAPI.search(query)
            .then((books) => {
                this.setState((currentState) => ({
                    searchResults: books
                }));
            })
            .then(() => {
                this.updateBookShelves();
                this.setState({
                    loadingResults: false
                });
            });
    };

    handleSearchInput(event) {
        let query = event.target.value;
        if (!this.state.alreadySearched) {
            this.setState({
                alreadySearched: true
            })
        }
        if (query === '') {
            this.setState({
                searchQuery: query,
                searchResults: []
            })
        } else {
            this.setState({
                searchQuery: query
            }, this.searchBooks(query));
        }
    }

    handleOnSetShelf(book, shelf) {
        let newBooks = this.state.searchResults;
        let bookIndex = newBooks.findIndex(x => x.id === book.id);
        if (bookIndex >= 0) {
            newBooks[bookIndex].shelf = shelf;
        } else {
            book.shelf = shelf;
            newBooks.push(book);
        }
        this.setState((currentState) => ({
            searchResults: newBooks
        }));

        const {onSetShelf} = this.props;
        onSetShelf(book, shelf)
    }

    render() {
        return (
            <div className="full-height-screen">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center text-uppercase color-primary font-1-5em mtop-30 font-700">
                                <FontAwesomeIcon icon="search" className="mright-15"/>Search</h1>
                            <div className="row">
                                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <div className="form-group mtop-15">
                                        <Debounce time="500" handler="onChange">
                                            <input type="text" className="form-control"
                                                   placeholder="Search a book by its title"
                                                   onChange={(event) => this.handleSearchInput(event)}/>
                                        </Debounce>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.loadingResults && <div className="row">
                        <div className="col-12">
                            <p className="text-center">
                                <FontAwesomeIcon icon="spinner" size="5x" spin
                                                 className="color-primary mtop-30 mbottom-15"/>
                            </p>
                        </div>
                    </div>}
                    {(this.state.searchResults && this.state.searchResults.length > 0) &&
                    <BookList icon="book-reader" title="Search results" books={this.state.searchResults}
                              onSetShelf={(book, shelf) => this.handleOnSetShelf(book, shelf)}/>}
                    {(this.state.searchResults && this.state.searchResults.error === 'empty query' && this.state.alreadySearched) &&
                    <div className="alert alert-warning">No books found using that search query.</div>}
                    {/*onSetShelf={(book, shelf) => this.setShelf(book, shelf)}*/}
                </div>
            </div>
        );
    }
}

export default Search;
