import React from 'react';
import EventListFilters from './EventListFilters';
import { Container, Row, Col } from 'reactstrap';
import EventImageSlider from './EventImageSlider';
import EventList from './EventList';
import LoggedInHeader  from './LoggedInHeader';
import { NavLink } from 'react-router-dom';

const LoggedInHome = () => (
    
    <div>
        <Container className="themed-container" fluid={true}>
            
                <LoggedInHeader />
            
            <div className="hero-layout">
            <Row>
                <Col xs="4">
                    <h1 className="image-slider__herotext">Schedule events and find public events to attend</h1>
                    <p className="image-slider__herotext__underneath">Choose a day, choose a time and make it public or private.</p>
                </Col>
                <Col xs="8"><div className = 'image-slider'><EventImageSlider /></div></Col>
            </Row>
            </div>
            <Row>
                <Col xs="12"><EventListFilters /></Col>
                <Col xs="12"><EventList /></Col>
            </Row>
        </Container>
        
    </div>
    
);

export default LoggedInHome;