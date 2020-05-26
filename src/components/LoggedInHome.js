import React from 'react';
import EventListFilters from './EventListFilters';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import EventImageSlider from './EventImageSlider';
//import EventList from './EventList';
import PublicEventsList from './publicEvents/PublicEventsList';
import Header from './Header';
import { NavLink } from 'react-router-dom';

const LoggedInHome = () => (
    <div><Header />
    <div className="hero-layout">
        <div className="container-fluid">
            <div className="hero-layout">  
                <Row>
                
                    <Col xs={{size:12, order:2}} sm="12" m="3" lg={{size:4, order:1}}>
                    
                        <h1 className="image-slider__herotext">Schedule events and find public events to attend</h1>
                        <p className="image-slider__herotext__underneath">Choose a day, choose a time and make it public or private.</p>
                    
                    </Col>
                
                    <Col xs={{size:12, order:1}} sm="12" m="7" lg={{size:8, order:2}}>
                        <div className = 'image-slider'>
                            <EventImageSlider />
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xl={{size: 11, offset: 1}}><EventListFilters /></Col>
                </Row>

                <Row>
                    <Col><PublicEventsList /></Col>
                </Row>
            </div>
        </div> 
    </div>
    </div>
);

export default LoggedInHome;