import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

class BookCard extends Component {
    static propTypes = {
        onSetShelf: PropTypes.func.isRequired
    };

    handleOnSetShelf = (event, book, shelf) => {
        event.preventDefault();
        const { onSetShelf } = this.props;
        onSetShelf(book, shelf);
    };

    render () {
        return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mbottom-30">
                <div>
                    {/* to={'/' + this.props.book.title.replace(/[']/g, '').replace(/[^\W\D\S]/g, ' ').split(' ').join('-').toLowerCase()} */}
                    <Link to={'/book/' + this.props.book.id} className="material-card">
                        <div className="material-card-img-container">
                            {this.props.book.imageLinks && this.props.book.imageLinks.thumbnail && <img src={this.props.book.imageLinks.thumbnail} alt="" className="img-fluid"/>}
                        </div>
                        <div className="material-card-info-container">
                            {this.props.book.title && <h3 className="material-card-title">{this.props.book.title}</h3>}
                            {this.props.book.subtitle && <p className="material-card-subtitle">{this.props.book.subtitle}</p>}
                            {this.props.book.authors && <p className="material-card-authors">Written by {this.props.book.authors.join(', ')}</p>}
                            <div className="material-card-button-container">
                                <button className="btn btn-primary text-uppercase font-700 block">Details</button>
                                <div className="dropdown">
                                    <button className="btn btn-secondary text-uppercase font-700 block dropdown-toggle" type="button"
                                            id={'dropdownMenuButton' + this.props.book.id} data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        {this.props.book.shelf === 'currentlyReading' && <FontAwesomeIcon icon="book-reader" />}
                                        {this.props.book.shelf === 'wantToRead' && <FontAwesomeIcon icon="book-open" />}
                                        {this.props.book.shelf === 'read' && <FontAwesomeIcon icon="book" />}
                                        {this.props.book.shelf !== 'currentlyReading' && this.props.book.shelf !== 'wantToRead' && this.props.book.shelf !== 'read' && <FontAwesomeIcon icon="minus-circle" />}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby={'dropdownMenuButton' + this.props.book.id}>
                                        <h6 className="dropdown-header">Move to shelf:</h6>
                                        <button onClick={(event) => this.handleOnSetShelf(event, this.props.book, 'currentlyReading')} className="dropdown-item"><FontAwesomeIcon icon="book-reader" className={"mright-5" + (this.props.book.shelf === 'currentlyReading' ? ' color-primary' : '')}/>Currently Reading</button>
                                        <button onClick={(event) => this.handleOnSetShelf(event, this.props.book, 'wantToRead')} className="dropdown-item"><FontAwesomeIcon icon="book-open" className={"mright-5" + (this.props.book.shelf === 'wantToRead' ? ' color-primary' : '')}/>Want to Read</button>
                                        <button onClick={(event) => this.handleOnSetShelf(event, this.props.book, 'read')} className="dropdown-item"><FontAwesomeIcon icon="book" className={"mright-5" + (this.props.book.shelf === 'read' ? ' color-primary' : '')}/>Read</button>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={(event) => this.handleOnSetShelf(event, this.props.book, 'none')} className="dropdown-item"><FontAwesomeIcon icon="minus-circle" className={"mright-5" + (this.props.book.shelf !== 'currentlyReading' && this.props.book.shelf !== 'wantToRead' && this.props.book.shelf !== 'read' ? ' color-primary' : '')}/>None</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BookCard;
