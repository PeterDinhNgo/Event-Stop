import React from 'react';
import SignUpPage from './authentication/SignUpPage';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const CreateAccountPage = () => (
    <div>
        <Container>
            <Row>
            <div className="signup-spacing">
                <Col><NavLink to="/" activeClassName="is-active" ><h1>Event Stop</h1></NavLink></Col>
            </div>
            </Row>
            <Row>
                <Col><SignUpPage /></Col>
            </Row>
        </Container>
    </div>
);

export default CreateAccountPage;