import React, {Component} from 'react';
import BookCard from './BookCard';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

class BookList extends Component {
    static propTypes = {
        onSetShelf: PropTypes.func.isRequired
    };
    
    render() {
        const { onSetShelf } = this.props;
        return (
            <div className="row">
                <div className="col-12">
                    <h2 className="section-title"><FontAwesomeIcon icon={this.props.icon} /> {this.props.title}</h2>
                    {this.props.books.length > 0 &&
                    <div className="row">
                        {
                            this.props.books.map((book) => {
                                return (
                                    <BookCard onSetShelf={(book, shelf) => onSetShelf(book, shelf)} book={book} key={book.id}/>
                                )
                            })
                        }
                    </div>
                    }
                    {this.props.books.length <= 0 &&
                    <div className="alert alert-warning">There are currently no books on this shelf.</div>
                    }
                </div>
            </div>
        );
    }
}

BookList.defaultProps = {
    books: []
};

export default BookList;
