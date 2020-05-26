import React from 'react';
import SignUpPage from './authentication/SignUpPage';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const CreateAccountPage = () => (
    
        <Container>
            <Row className="justify-content-center">
                <Col xs="12" md="6">
                    <NavLink to="/" activeClassName="is-active"><h1 className="signup-spacing">Event Stop</h1></NavLink>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" md="6">
                    <SignUpPage />
                </Col>
            </Row>
        </Container>
    
);

export default CreateAccountPage;