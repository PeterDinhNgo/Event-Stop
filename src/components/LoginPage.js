import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import SignUpPage from './authentication/SignUpPage';
import SignInPage from './authentication/SignInPage';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

export const LoginPage = ({ startLogin }) => (
    <div>
    <Container>
        <Row>
        <div className="signup-spacing">
            <Col><NavLink to="/" activeClassName="is-active" ><h1 className="font-size">Event Stop</h1></NavLink></Col>
        </div>
        </Row>
        <Row>
            <div className = "signup-spacing__button">
            <Col><NavLink to="/create_account" ><Button color="success">Create Account</Button></NavLink></Col>
            </div>
        </Row>
        <Row>
            <div className = "signup-spacing__button">
                <Col><Button color="success" onClick={startLogin}>Continue with Google</Button></Col>
            </div>
        </Row>
        <Row>
            <SignInPage />
        </Row>
    </Container>
        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()) 
});

export default connect(undefined, mapDispatchToProps)(LoginPage);