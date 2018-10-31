import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import {Route, Switch} from 'react-router-dom';
import BookDetails from './BookDetails';
// Font Awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleDown,
    faBook,
    faBookReader,
    faBookOpen,
    faMinusCircle,
    faSearch,
    faStar,
    faStarHalfAlt,
    faSpinner,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import HeaderImage from "./img/book-1920x350.jpg";
import MobileHeaderImage from "./img/book-993x350.jpg";
import Search from "./Search";
import WhiteLogo from "./img/my-reads-white-120x44.png";
import './App.css';

library.add(faArrowAltCircleDown);
library.add(faBook);
library.add(faBookReader);
library.add(faBookOpen);
library.add(faMinusCircle);
library.add(faSearch);
library.add(faStar);
library.add(faStarHalfAlt);
library.add(farStar);
library.add(faSpinner);
library.add(faBars);
library.add(faTimes);

class App extends Component {
    state = {
        allBooks: []
    };

    getAllBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    allBooks: books
                }));
            });
    };

    componentDidMount() {
        this.getAllBooks();
    }

    setShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
        let newState = Object.assign({}, this.state);
        let newBooks = newState.allBooks;
        let bookIndex = newBooks.findIndex(x => x.id === book.id);
        if (bookIndex >= 0) {
            newBooks[bookIndex].shelf = shelf;
        } else {
            book.shelf = shelf;
            newBooks.push(book);
        }
        this.setState((currentState) => ({
            allBooks: newBooks
        }));
    };

    render() {
        let bookLists = [{
            icon: 'book-reader',
            title: 'Currently reading',
            shelf: 'currentlyReading'
        }, {
            icon: 'book-open',
            title: 'Want to read',
            shelf: 'wantToRead'
        }, {
            icon: 'book',
            title: 'Read',
            shelf: 'read'
        }];
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" render={({history}) => (
                        <div>
                            <div>
                                <div className="absolutely-centered text-center">
                                    <div className="relative">
                                        <img src={HeaderImage} alt=""
                                             className="img-fluid d-none d-sm-none d-md-block"/>
                                        <img src={MobileHeaderImage} alt=""
                                             className="img-fluid d-block d-sm-block d-md-none"/>
                                        <div className="black-filter"></div>
                                        <div className="absolutely-centered-text">
                                            <h1 className="font-700 color-fff font-2em">Welcome to MyReads</h1>
                                            {/*<img src={WhiteLogo} alt="MyReads' White Logo" className="img-fluid"/>*/}
                                            <p className="font-300 color-fff font-1-3em d-none d-sm-block">The best way
                                                to
                                                manage your reading</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid mtop-30">
                                <div className="container">
                                    {bookLists.map((bookList, index) => {
                                        return (
                                            <div key={bookList.shelf}>
                                                <BookList icon={bookList.icon} title={bookList.title}
                                                          books={this.state.allBooks.filter((book) => {
                                                              return book.shelf === bookList.shelf
                                                          })} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                                                {index !== bookLists.length - 1 && <hr/>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}/>
                    <Route exact path="/currently-reading" render={({history}) => (
                        <div className="container-fluid full-height-screen">
                            <div className="container ptop-30">
                                <BookList icon="book-reader" title="Currently reading"
                                          books={this.state.allBooks.filter((book) => {
                                              return book.shelf === 'currentlyReading'
                                          })} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                            </div>
                        </div>
                    )}/>
                    <Route exact path="/want-to-read" render={({history}) => (
                        <div className="container-fluid full-height-screen">
                            <div className="container ptop-30">
                                <BookList icon="book-open" title="Want to read"
                                          books={this.state.allBooks.filter((book) => {
                                              return book.shelf === 'wantToRead'
                                          })} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                            </div>
                        </div>
                    )}/>
                    <Route exact path="/read" render={({history}) => (
                        <div className="container-fluid full-height-screen">
                            <div className="container ptop-30">
                                <BookList icon="book" title="Read" books={this.state.allBooks.filter((book) => {
                                    return book.shelf === 'read'
                                })} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                            </div>
                        </div>
                    )}/>
                    <Route path="/book/:id" render={(props) => (
                        <BookDetails {...props} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                    )}/>
                    <Route path="/search" render={(props) => (
                        <Search {...props} allBooks={this.state.allBooks} onSetShelf={(book, shelf) => this.setShelf(book, shelf)}/>
                    )}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
