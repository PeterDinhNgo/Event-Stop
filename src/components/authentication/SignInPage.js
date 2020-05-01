import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/auth';
import history from "../../history";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Badge } from 'reactstrap';

export class SignInPage extends React.Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
        if(this.props.authError === null) {
            history.push('/dashboard')
        }
       
    }
    
    render() {
        const { authError } = this.props; // check if authError exists on our component props
        return (
            
            <div className="container">
                
                <Form onSubmit={this.handleSubmit}>
                <h1><Badge color="primary">Sign In</Badge></h1>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter Your Email" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Choose a Password" onChange={this.handleChange}/>
                </FormGroup>
                
                <Button color="primary" >Sign In</Button>
                
                    {/* <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" onChange={this.handleChange}/>
                    </div> */}
                        <div>
                                { authError ? <Alert color="danger"><p >{ authError }</p></Alert>: ""}
                        </div>
            
                </Form>
            </div>
                /* <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form> */
            
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return { // this returned object represents what we want to attach to the props of this component.
        signIn: (creds) => dispatch(signIn(creds))
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

