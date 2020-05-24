import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Badge, Alert } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

class UserProfile extends React.Component {
    constructor(props){
        super(props)

      

        var user = firebase.auth().currentUser;
        const email = user.email;
        const displayName = user.displayName;

        this.state = {
            email: email ? email : '',
            displayName: displayName ? displayName : '',
            password: '',
            error: '',
            successAlert: '',
            successUpdateAlert: '',
            oldPassword: '',
            center: {
                latitude: '',
                longitude: ''
            }
        }
        
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
            
        })
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
            var user = firebase.auth().currentUser;
            this.setState(() => ({ successUpdateAlert: 'Your user profile has been updated.'}));
            user.updateProfile({
                email: this.state.email,
                displayName: this.state.displayName,
          }).then(function() {
                
          }).catch(function(error) {
            alert(error);
          })
         
        
    }

    handlePasswordSubmit = (e) => {
       
        if(!this.state.password){
            this.setState(() => ({ error: 'Please enter a valid password.' }));

        } else {
            this.setState(() => ({ error: ''}));
            const newPassword = this.state.password;
            var user = firebase.auth().currentUser;
            var repass = this.state.oldPassword;
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                repass
            );
            var that = this;
            user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            user.updatePassword(newPassword).then(() => {
                // Update successful.
                that.setState(() => ({ successAlert: 'Your password has been updated.'}));
              }).catch(function(error) {
                // An error happened.
                alert(error);
                that.setState(() => ({ successAlert: ''}));
              });
          }).catch(function(error) {
            // An error happened.
            alert(error);
          });
          
        }
        
        
    }

    render(){
        const { authError } = this.props;
        
        return (
            
            <div>
            
            <Header />

            
            <Form className="container" onSubmit={this.handleSubmit}>
            <Col xs="6" sm={{size:6}} md={{size:10, offset: 2 }}>
                {this.state.center.latitude && this.state.center.longitude ? 
                <img  src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.center.latitude},${this.state.center.longitude}&zoom=15&size=1080x320&sensor=false&markers=color:red%7C${this.state.center.latitude},${this.state.center.longitude}&key=AIzaSyDBrBu6qS8z4WX-Fe6U5ulBSMo-5PsxfMo`} alt=''/>: null}

            </Col>
            <h1><Badge color="success">User Profile</Badge></h1>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter Your Email" 
                value={this.state.email}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label>Username</Label>
                <Input 
                type="text" 
                placeholder="Username" 
                id="displayName" 
                value = {this.state.displayName}
                onChange={this.handleChange}    
                />
            </FormGroup>
            <Button color="primary" >Update</Button>
            {this.state.successUpdateAlert && <Alert color="success"><p>{this.state.successUpdateAlert}</p></Alert>}

            </Form>
            <br />
            <Form className="container">
            <FormGroup>
                <Label for="password">Confirm New Password</Label>
                <Input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter a new password" 
                value={this.state.password}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="oldPassword">Confirm Old Password</Label>
                <Input 
                type="password" 
                name="oldPassword" 
                id="oldPassword" 
                placeholder="Enter a new password" 
                value={this.state.oldPassword}
                onChange={this.handleChange}
                />
            </FormGroup>
            { authError ? <Alert color="danger"><p>{ authError }</p></Alert> : ''}
            <Button color="danger" onClick={this.handlePasswordSubmit}>Change Password</Button>
            {this.state.error && <Alert color="danger"><p>{this.state.error}</p></Alert>}
            {this.state.successAlert && <Alert color="success"><p>{this.state.successAlert}</p></Alert>}
            </Form>
            
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps)(UserProfile);
