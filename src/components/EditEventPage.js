import React from 'react';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { startEditEvent } from '../actions/events';
import { startRemoveEvent } from '../actions/events';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import Header from './Header';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export class EditEventPage extends React.Component {
    
    onSubmit = (event) => {
        this.props.startEditEvent(this.props.event.id, event);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemoveEvent({ id: this.props.event.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <Header />
                
                <EventForm
                    event={this.props.event}
                    onSubmit={this.onSubmit}
                />
               <div className="container">
                <Row className="justify-content-center">
                    <Col xs="12" md="6" lg="8">
                        <Button onClick={this.onRemove} className="input-field__padder btn-block btn-lg" color="danger">Remove</Button>
                    </Col>
                </Row>
                </div>   
                  
               
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        event: state.events.find((event) => event.id === props.match.params.id)  
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditEvent: (id, event) => dispatch(startEditEvent(id ,event)),
    startRemoveEvent: (data) => dispatch(startRemoveEvent(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);