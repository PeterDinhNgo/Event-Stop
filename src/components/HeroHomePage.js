import React from 'react';
import EventListFilters from './EventListFilters';
import { NavLink } from 'react-router-dom';
import EventImageSlider from './EventImageSlider';
import PublicEventsList from './publicEvents/PublicEventsList';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';


const EventHomePage = () => (
    <div >
        <Navbar collapseOnSelect expand="lg" className="header-bar_hero sticky-top">
                <Navbar.Brand bsPrefix="header-bar_logo" >Event Stop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink to="/signin" className="header-bar_hero_links">Log In</NavLink>
                        <NavLink to="/create_account" className="header-bar_hero_links">Sign Up</NavLink>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        <Container className="themed-container hero-layout" fluid={true}>
        <div className="container">
                <Row>
                    <Col xs="12" md="4" lg="4" className="align-self-center"> 
                        <h1 className="hero-layout_title d-none d-md-block">Virtual Events. Exclusive Access.</h1>
                        <h1 className="hero-layout_mobile_title d-xs-block d-md-none">Virtual Events. Exclusive Access.</h1>
                        <p className="hero-layout_small_title d-none d-lg-block">Choose a day, choose a time and choose a streaming platform.</p>
                    </Col>
                    <Col xs="12" md="8" lg="8">
                        <div className = "align-self-center">
                            <img src="/images/wfh_3.svg"></img>
                        </div>
                    </Col>
                </Row>
        </div>
            {/* <div className="hero-layout">
                <Row>
                    <Col xs="12" lg="5" className="align-self-center"> 
                        <h1 className="hero-layout_title d-none d-lg-block">Virtual Events. Exclusive Access.</h1>
                        <h1 className="image-slider__herotext_mobile d-xs-block d-md-none">Sell and Buy Tickets for your Private Virtual Events</h1>
                        <p className="hero-layout_small_title d-none d-lg-block">Choose a day, choose a time and choose a streaming platform.</p>
                    </Col>
                    <Col xs="12" lg="7">
                        <div className = 'image-slider'>
                            <img src="/images/wfh_3.svg"></img>
                        </div>
                    </Col>
                </Row>
            </div> */}
            <Row>
                <Col lg="12"><EventListFilters /></Col>
                <Col xs="12"><PublicEventsList /></Col>
            </Row>
        </Container>
    </div>
);

export default EventHomePage;