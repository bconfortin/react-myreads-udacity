import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Logo from './img/my-reads-120x44.png';
import MobileMenu from './MobileMenu';

class Header extends Component {
    state = {
        blackout: false,
        mobileMenu: false
    };

    openMobileMenu = (event) => {
        event.preventDefault();
        this.setState({
            blackout: true,
            mobileMenu: true
        });
    };

    closeMobileMenu = () => {
        this.setState({
            blackout: false,
            mobileMenu: false
        });
    };

    render () {
        let links = [{
            name: 'Home',
            path: '/'
        }, {
            name: 'Currently reading',
            path: '/currently-reading'
        }, {
            name: 'Want to read',
            path: '/want-to-read'
        }, {
            name: 'Read',
            path: '/read'
        }];
        return (
            <header className="bg-fff">
                <div className="container-fluid padver-15">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-sm-3">
                                <Link to="/">
                                    <img src={Logo} alt="MyReads' Logo"/>
                                </Link>
                            </div>
                            <div className="col-6 col-sm-9 d-none d-sm-none d-md-block">
                                <nav>
                                    <ul className="header-nav">
                                        { links.map((link) => {
                                            return <li key={link.name}><Link className="nav-link" to={link.path}>{link.name}</Link></li>
                                        })}
                                        <li><Link className="nav-link" to="/search"><FontAwesomeIcon icon="search" /></Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-6 col-sm-9 d-block d-sm-block d-md-none">
                                <nav>
                                    <ul className="header-nav">
                                        <li><a href=""><FontAwesomeIcon icon="bars" size="lg" className="mtop-10" onClick={(event) => this.openMobileMenu(event)}/></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.blackout && <div className="blackout" onClick={() => this.closeMobileMenu()}/>}
                {this.state.mobileMenu && <MobileMenu links={links} onCloseMobileMenu={() => this.closeMobileMenu()} logo={Logo}/>}
            </header>
        );
    }
}

export default Header;
