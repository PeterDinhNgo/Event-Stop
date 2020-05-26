import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import SignUpPage from './authentication/SignUpPage';
import SignInPage from './authentication/SignInPage';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

export const LoginPage = ({ startLogin }) => (
    <div className="container">
        <Row className="justify-content-center">
                <Col xs="12" md="6">
                    <NavLink to="/" activeClassName="is-active" ><h1 className="authentication">Event Stop</h1></NavLink>
                </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs="12" md="6">
                    <NavLink to="/create_account" ><Button className="btn-lg btn-block signup-spacing__button" color="success">Create Account</Button></NavLink>
            </Col>    
        </Row>
        <Row className="justify-content-center">
            <Col xs="12" md="6">
                <Button className="btn-lg btn-block signup-spacing__button" color="success" onClick={startLogin}>Continue with Google</Button>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs="12" lg="6">
                <SignInPage />
            </Col>
        </Row>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()) 
});

export default connect(undefined, mapDispatchToProps)(LoginPage);