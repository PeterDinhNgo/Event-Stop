import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { Button, Form, FormGroup, Label, Input, Row, Badge, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export class ForgotPassword extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const auth = firebase.auth();
        const emailAddress = this.state.email;
        auth.sendPasswordResetEmail(emailAddress).then(() => {
            toast('Please check your email to reset your password!', { type: 'success'});
        }).catch((error) => {
            toast(`${error}`, { type: 'warning', autoClose: false});
        })
    }

    handleHistory = (e) => {
        e.preventDefault();
        if ('scrollRestoration' in window.history) { 
            window.history.scrollRestoration = 'auto'; 
            window.history.back();
        }
    }
    
    render(){
        return(
            <div className="container">
                <Row className="justify-content-center">
                    <Col xs="12" md="6">
                        <Form onSubmit={this.handleSubmit} >
                            <h1 className="authentication_forgot_password"><Badge color="primary" >Enter your email to reset your email!</Badge></h1>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input className="form-control form-control-lg" type="email" name="email" id="email" value={this.state.email} placeholder="Enter Your Email" onChange={this.handleChange}/>
                            </FormGroup>
                            <Button color="primary">Send Password Reset</Button>
                        </Form>
                        
                    </Col>
                    
                </Row>
                <Row className="justify-content-center">
                    <Col xs="12" md="6">
                    <button className="btn btn-dark authentication_forgot_password authentication_forgot_password_back" onClick={this.handleHistory}>Go Back</button>
                    </Col>
                </Row>
                
            </div>
        )
    }

}

export default connect()(ForgotPassword);