import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Navbar, Nav } from 'react-bootstrap';

// Header-Bar Scss
export const Header = ({ startLogout }) => (
    
    <Navbar collapseOnSelect expand="lg"  className="header-bar">
        <Navbar.Brand bsPrefix="header-bar_logo" >Event Stop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                
            </Nav>
            <Nav>
                <Nav.Link href="/signed_in/home" className="header-bar_links">Discover</Nav.Link>
                <Nav.Link href="/create" className="header-bar_links">Create Event</Nav.Link>
                <Nav.Link href="/dashboard" className="header-bar_links">Manage</Nav.Link>
                <Nav.Link href="/user_profile" className="header-bar_links">Your Profile</Nav.Link>
                <Nav.Link href="/" onClick={ startLogout } className="header-bar_logout">Log Out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);