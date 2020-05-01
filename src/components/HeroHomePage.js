import React from 'react';
import EventListFilters from './EventListFilters';
import { NavLink } from 'react-router-dom';
import EventImageSlider from './EventImageSlider';
import PublicEventList from './PublicEventList';
import { Container, Row, Col } from 'reactstrap';


const EventHomePage = () => (

    
    <div >
        <Container className="themed-container" fluid={true}>
            <Row className="home">
                <Col xs="8" ><h1 className="page-title">Event Stop</h1></Col>
                <Col xs="4" className="home__spacing">
                    
                    <NavLink to="/signin"><button className="button">Log In</button></NavLink>
                    <NavLink to="/create_account" ><button className="button">Sign Up</button></NavLink>
                    
                </Col>
            </Row>
            <div className="hero-layout">
            <Row>
                <Col xs="4">
                    <h1 className="image-slider__herotext">Schedule events and find public events to attend</h1>
                    <p className="image-slider__herotext__underneath">Choose a day, choose a time and make it public or private.</p>
                </Col>
                <Col xs="8">
                
                <div className = 'image-slider'><EventImageSlider /></div>
                
                </Col>
            </Row>
            </div>
            <Row>
                <Col xs="12"><EventListFilters /></Col>
                <Col xs="12"><PublicEventList /></Col>
            </Row>
        </Container>
    </div>
);

export default EventHomePage;