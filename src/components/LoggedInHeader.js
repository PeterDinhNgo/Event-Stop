import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Container, Row, Col } from 'reactstrap';

export const LoggedInHeader = ({ startLogout }) => (
    
    <Row className="home">
        <Col s={{ size: '7', order: 1}} ><h1 className="page-title">Event Stop</h1></Col>
        <Col s={{ size: 'auto', order: 2}}>

            <a href="/dashboard"><button className="button">Event Dashboard</button></a>
            <NavLink to="/create"><button className="button">Create Event</button></NavLink>
            <button onClick={ startLogout } className="button">Logout</button>
        </Col>
    </Row>
    
    
    
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(LoggedInHeader);