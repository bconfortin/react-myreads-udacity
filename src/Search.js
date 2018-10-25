import React, { Component } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as BooksAPI from './BooksAPI'
import BookList from "./BookList";
import PropTypes from "prop-types";

class Search extends Component {
    static propTypes = {
        onSetShelf: PropTypes.func.isRequired
    };

    state = {
        searchQuery: '',
        searchResults: [],
        alreadySeached: false,
        loadingResults: false
    };

    searchBooks = () => {
        this.setState({
            loadingResults: true
        });
        BooksAPI.search(this.state.searchQuery)
            .then((books) => {
                this.setState((currentState) => ({
                    searchResults: books
                }));
            })
            .then(() => {
                this.setState({
                    loadingResults: false
                });
            });
    };

    handleSearchKeyPress = (event) => {
        if (event.key === "Enter") {
            if (!this.state.alreadySearched) {
                this.setState({
                    alreadySeached: true
                })
            }
            this.searchBooks()
        }
    };

    handleSearchInput(query) {
        this.setState((currentState) => ({
            searchQuery: query
        }));
    }

    render() {
        const { onSetShelf } = this.props;
        return (
            <div className="full-height-screen">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center text-uppercase color-primary font-1-5em mtop-30 font-700"><FontAwesomeIcon icon="search" className="mright-15"/>Search</h1>
                            <div className="row">
                                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <div className="form-group mtop-15">
                                        <input type="text" className="form-control" placeholder="Search a book by its title" value={this.state.searchQuery} onChange={(event) => this.handleSearchInput(event.target.value)} onKeyPress={this.handleSearchKeyPress}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.loadingResults && <div className="row">
                        <div className="col-12">
                            <p className="text-center">
                                <FontAwesomeIcon icon="spinner" size="5x" spin className="color-primary mtop-30 mbottom-15"/>
                            </p>
                        </div>
                    </div>}
                    {(this.state.searchResults && this.state.searchResults.length > 0) && <BookList icon="book-reader" title="Search results" books={this.state.searchResults} onSetShelf={(book, shelf) => onSetShelf(book, shelf)}/>}
                    {(this.state.searchResults.error && this.state.alreadySeached) && <div className="alert alert-warning">No books found using that search query.</div>}
                    {/*onSetShelf={(book, shelf) => this.setShelf(book, shelf)}*/}
                </div>
            </div>
        );
    }
}

export default Search;
