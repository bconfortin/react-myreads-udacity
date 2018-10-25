import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class BookCard extends Component {
    state = {
        book: {
            title: '',
            subtitle: '',
            authors: [],
            publisher: '',
            publishedDate: '',
            description: '',
            industryIdentifiers: [],
            readingModes: {},
            pageCount: '',
            printType: '',
            categories: [],
            averageRating: '',
            ratingsCount: '',
            maturityRating: '',
            allowAnonLogging: '',
            contentVersion: '',
            panelizationSummary: {},
            imageLinks: {},
            language: '',
            previewLink: '',
            infoLink: '',
            canonicalVolumeLink: '',
            id: '',
            shelf: ''
        }
    };

    getBookByID = (id) => {
        BooksAPI.get(id)
            .then((book) => {
                this.setState((currentState) => ({
                    book: book
                }));
            });
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getBookByID(id);
    }

    handleOnSetShelf = (event, book, shelf) => {
        event.preventDefault();
        const {onSetShelf} = this.props;
        onSetShelf(book, shelf);
        book.shelf = shelf;
        this.setState((currentState) => ({
            book: book
        }));
    };

    render() {
        return (
            <div>
                {this.state.book.title !== '' &&
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="bg-fff padding-15 marver-30">
                                    <div className="book-details-container">
                                        <div className="book-details-container-img">
                                            <img src={this.state.book.imageLinks.thumbnail} alt=""
                                                 className="img-fluid mx-auto"/>
                                        </div>
                                        <div className="book-details-container-info">
                                            <h1 className="book-title">{this.state.book.title}</h1>
                                            <h2 className="book-subtitle">{this.state.book.subtitle}</h2>
                                            <p>By {this.state.book.authors.join(', ')}</p>
                                            {
                                                typeof this.state.book.averageRating !== 'undefined' &&
                                                <p className="color-yellow">
                                                    {
                                                        this.state.book.averageRating % 1 === 0 && [...Array(this.state.book.averageRating)].map((e, i) =>
                                                            <FontAwesomeIcon icon="star" key={i}/>)
                                                    }
                                                    {
                                                        this.state.book.averageRating % 1 !== 0 &&
                                                        [...Array(Math.floor(this.state.book.averageRating))].map((e, i) =>
                                                            <FontAwesomeIcon icon="star" key={i}/>).concat(
                                                            <FontAwesomeIcon icon="star-half-alt" key="half-star"/>)

                                                    }
                                                    {
                                                        5 - this.state.book.averageRating >= 1 && [...Array(5 - Math.round(this.state.book.averageRating))].map((e, i) =>
                                                            <FontAwesomeIcon icon={['far', 'star']} key={i}/>)
                                                    }
                                                    <span
                                                        className="mleft-5 color-333">({this.state.book.averageRating} out of 5 based on {this.state.book.ratingsCount} reviews)</span>
                                                </p>
                                            }
                                            <p className="mbottom-5"><span
                                                className="font-700">Publisher:</span> {this.state.book.publisher}</p>
                                            <p className="mbottom-5"><span
                                                className="font-700">Published Date:</span> {this.state.book.publishedDate}
                                            </p>
                                            <p className="mbottom-5"><span
                                                className="font-700">Print Type:</span> {this.state.book.printType}</p>
                                            <p className="mbottom-5"><span
                                                className="font-700">Page Count:</span> {this.state.book.pageCount}</p>
                                            <p className="mbottom-5"><span
                                                className="font-700">Maturity Rating:</span> {this.state.book.maturityRating}
                                            </p>
                                            <p className="mbottom-5"><span
                                                className="font-700">Language:</span> {this.state.book.language}</p>
                                            {typeof this.state.book.categories !== 'undefined' &&
                                            <p className="mbottom-5"><span
                                                className="font-700">Categories:</span> {this.state.book.categories.join(', ')}
                                            </p>}
                                            {typeof this.state.book.categories === 'undefined' &&
                                            <p className="mbottom-5"><span className="font-700">Categories:</span> Not
                                                categorized</p>}
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary text-uppercase font-700 block dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    {this.state.book.shelf === 'currentlyReading' && 'Currently reading'}
                                                    {this.state.book.shelf === 'read' && 'Read'}
                                                    {this.state.book.shelf === 'wantToRead' && 'Want to read'}
                                                    {(this.state.book.shelf === 'none' || typeof this.state.book.shelf === 'undefined') && 'None'}
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <h6 className="dropdown-header">Move to shelf:</h6>
                                                    <button
                                                        onClick={(event) => this.handleOnSetShelf(event, this.state.book, 'currentlyReading')}
                                                        className="dropdown-item">
                                                        <FontAwesomeIcon icon="book-reader"
                                                                         className={"mright-5" + (this.state.book.shelf === 'currentlyReading' ? ' color-primary' : '')}/>
                                                        Currently Reading
                                                    </button>
                                                    <button
                                                        onClick={(event) => this.handleOnSetShelf(event, this.state.book, 'wantToRead')}
                                                        className="dropdown-item">
                                                        <FontAwesomeIcon icon="book-open"
                                                                         className={"mright-5" + (this.state.book.shelf === 'wantToRead' ? ' color-primary' : '')}/>
                                                        Want to Read
                                                    </button>
                                                    <button
                                                        onClick={(event) => this.handleOnSetShelf(event, this.state.book, 'read')}
                                                        className="dropdown-item">
                                                        <FontAwesomeIcon icon="book"
                                                                         className={"mright-5" + (this.state.book.shelf === 'read' ? ' color-primary' : '')}/>
                                                        Read
                                                    </button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        onClick={(event) => this.handleOnSetShelf(event, this.state.book, 'none')}
                                                        className="dropdown-item">
                                                        <FontAwesomeIcon icon="minus-circle"
                                                                         className={"mright-5" + (this.state.book.shelf === 'none' ? ' color-primary' : '')}/>
                                                        None
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-fff padding-15 mbottom-30">
                                    <h3 className="section-title">Description</h3>
                                    <p>{this.state.book.description}</p>
                                </div>
                                <div className="bg-fff padding-15 mbottom-30">
                                    <h3 className="section-title">Technical information</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Type</th>
                                                <th scope="col">Identifier</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row">Book ID</th>
                                                <td>{this.state.book.id}</td>
                                            </tr>
                                            {this.state.book.industryIdentifiers.map((identifier) => {
                                                return <tr key={identifier.identifier}>
                                                    <th scope="row">{identifier.type}</th>
                                                    <td>{identifier.identifier}</td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {this.state.book.title === '' &&
                <div className="loading-container">
                    <p className="text-center">
                        <FontAwesomeIcon icon="spinner" size="5x" spin/>
                    </p>
                </div>
                }
            </div>
        );
    }
}

export default BookCard;
