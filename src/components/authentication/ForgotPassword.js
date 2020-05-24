import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { Button, Form, FormGroup, Label, Input, FormText, Badge } from 'reactstrap';
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
            toast('Reset link has been sent!', { type: 'success'});
        }).catch((error) => {
            toast(`${error}`, { type: 'warning', autoClose: false});
        })
        
        
    }
    
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <h1><Badge color="primary">Enter your email to reset your email!</Badge></h1>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value={this.state.email} placeholder="Enter Your Email" onChange={this.handleChange}/>
                    </FormGroup>
                    <Button color="primary">Send</Button>
                </Form>
            </div>
        )
    }

}

export default connect()(ForgotPassword);