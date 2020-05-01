import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Badge } from 'reactstrap';
import Recaptcha from 'react-recaptcha';

export class SignUpPage extends React.Component {
    constructor(props){
        super(props)
    
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            email: '',
            password: '',
            isVerified: false
        };
    }
    
    handleSubscribe = (e) => {
        e.preventDefault();
        if (this.state.isVerified) {
            this.props.signUp(this.state);
        } else {
            alert('Please verify that you are human!');
        }
    }

    verifyCallback(response) {
        if(response) {
            this.setState({
                isVerified: true
            })
        }
    }

    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.authcheck){
            if (this.props.authError === null) {
                this.props.signUp(this.state);
            }
        }
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (this.state.isVerified){
    //         if (this.props.authError) {
    //             console.log(this.props.authError)
    //         } else if (this.props.authError === null) {
    //             this.props.signUp(this.state);
    //             alert('Please verify your email in order to signin.')
    //         } 
    //     } else {
    //         alert('Please verify that you are human');
    //     }
    // };
    recaptchaLoaded(){
        console.log('captcha successfully loaded')
    }

    render() {
        const { authError } = this.props;
        return (
            <div className="container">
                <Form onSubmit={this.handleSubscribe}>
                    <h1><Badge color="primary">Create an Account</Badge></h1>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter Your Email" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Choose a Password" onChange={this.handleChange}/>
                    </FormGroup>
                    <div>
                        { authError ? <Alert color="danger"><p>{ authError }</p></Alert> : <Alert color="info"><p>Please Verify Your Email After Signup! </p></Alert>}
                    </div>
                    <Button>Sign Up</Button>
                </Form>
                
                    <Recaptcha 
                        sitekey="6LezdvAUAAAAAAWmg5D43zI9BJBHSgE18JfZpvEn"
                        render="explicit"
                        verifyCallback={this.verifyCallback}
                        onloadCallback={this.recaptchaLoaded}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => ({
    signUp: (newUser) => dispatch(signUp(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
