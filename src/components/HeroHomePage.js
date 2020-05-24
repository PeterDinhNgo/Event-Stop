import React from 'react';
import EventListFilters from './EventListFilters';
import { NavLink } from 'react-router-dom';
import EventImageSlider from './EventImageSlider';
import PublicEventsList from './publicEvents/PublicEventsList';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';


const EventHomePage = () => (
    <div>
        <Navbar collapseOnSelect expand="lg" className="header-bar_hero">
                <Navbar.Brand bsPrefix="header-bar_logo" >Event Stop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link><NavLink to="/signin" className="header-bar_hero_links">Log In</NavLink></Nav.Link>
                        <Nav.Link><NavLink to="/create_account" className="header-bar_hero_links">Sign Up</NavLink></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        <Container className="themed-container hero-layout" fluid={true}>
            {/* <Row className="home">
                <Col xs="8" >
                    <h1 className="page-title">Event Stop</h1>
                </Col>
                <Col xs="4" className="home__spacing">
                    <NavLink to="/signin"><button className="button">Log In</button></NavLink>
                    <NavLink to="/create_account" ><button className="button">Sign Up</button></NavLink>
                </Col>
            </Row> */}
            <div className="hero-layout">
                <Row>
                    <Col xs="12" lg="4">
                        <h1 className="image-slider__herotext d-none d-lg-block">Schedule events and find public events to attend</h1>
                        <h1 className="image-slider__herotext_mobile d-xs-block d-md-none">Explore and schedule events and push the boundaries of what's possible</h1>
                        <p className="image-slider__herotext__underneath d-none d-lg-block">Choose a day, choose a time and make it public or private.</p>
                    </Col>
                    <Col xs="12" lg="8">
                        <div className = 'image-slider'>
                            <EventImageSlider />
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col lg="12"><EventListFilters /></Col>
                <Col xs="12"><PublicEventsList /></Col>
            </Row>
        </Container>
    </div>
);

export default EventHomePage;