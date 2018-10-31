import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

function MobileMenu(props) {
    const { onCloseMobileMenu } = props;
    return (
        <div className="mobile-menu">
            <div className="close">
                <FontAwesomeIcon icon="times" onClick={() => onCloseMobileMenu()}/>
            </div>
            <div className="mtop-15">
                <img src={props.logo} alt="MyReads' Logo" className="img-fluid mx-auto block"/>
            </div>
            <ul className="mtop-30">
                { props.links.map((link) => {
                    return <li key={link.name}><Link className="nav-link" to={link.path}>{link.name}</Link></li>
                })}
            </ul>
        </div>
    );
}

MobileMenu.propTypes = {
    onCloseMobileMenu: PropTypes.func.isRequired
};

export default MobileMenu;
