import React from 'react';
import EventListFilters from './EventListFilters';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import EventImageSlider from './EventImageSlider';
//import EventList from './EventList';
import PublicEventsList from './publicEvents/PublicEventsList';
import Header from './Header';
import { NavLink } from 'react-router-dom';

const LoggedInHome = () => (
    <div className="dashboard"><Header />
    
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
                <Row className="justify-content-center">
                    <Col xs="12" md="12" lg="12"><EventListFilters/></Col>
                    
                </Row>
 
        </div>
                    
        <PublicEventsList/>
       
        
    {/* <div className="hero-layout">
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
    </div> */}
    </div>
);

export default LoggedInHome;