import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signIn, signInNoRemember } from '../../actions/auth';
import history from "../../history";
import { Button, Form, FormGroup, Label, Input, Alert, Badge, CustomInput } from 'reactstrap';
import Cookies from 'js-cookie';


export class SignInPage extends React.Component {

    state = {
        email: Cookies.get('email_rm') ? Cookies.get('email_rm') : '',
        password: '',
        checked: true
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleCheck = (e) => {
        this.setState({
            checked: !this.state.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.checked){
            this.props.signInNoRemember(this.state);
        } else if (!this.state.checked){
            this.props.signIn(this.state);
            Cookies.set('email_rm', this.state.email , { expires: 3});
        }
        if(this.props.authError === null) {
            history.push('/dashboard')
        }
    };
  
    
    render() {
        const { authError } = this.props; // check if authError exists on our component props
        return (
            
            <div className="container">
                
                <Form onSubmit={this.handleSubmit}>
                <h1><Badge color="primary">Sign In</Badge></h1>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={this.state.email} placeholder="Enter Your Email" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={this.state.password} placeholder="Enter Your Password" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup><CustomInput type="checkbox" id="checkbox" value={this.state.checked} onChange={this.handleCheck} label="Remember Me"/></FormGroup>
                <Button color="primary" >Sign In</Button>
                        <div>
                                { authError ? <Alert color="danger"><p >{ authError }</p></Alert>: ""}
                        </div>
                <NavLink to="/forgot">Forgot Password ?</NavLink>
                </Form>
            </div>
               
            
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return { // this returned object represents what we want to attach to the props of this component.
        signIn: (creds) => dispatch(signIn(creds)),
        signInNoRemember: (creds) => dispatch(signInNoRemember(creds))
    }
}

const mapStateToProps = (state) => {
    return { // attach authError property to our props of this component.
        authError: state.auth.authError //.auth because it's stored on the auth property: authReducer in our configureStore.js, then in the authReducer the state is called authError.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)

// To begin, we must mapDispatchToProps so that we have access to
// the signIn method in our actions/auth.js.
// 1. import { connect } from 'react-redux';
// 2. import { signIn } from '../actions/auth';
// 3. connect this SignIn component to redux using export default connect()()
// 4. Now we need the mapDispatchToProps, so that we can make a dispatch from this component,
// and call the action creator = signIn in actions/auth.js

