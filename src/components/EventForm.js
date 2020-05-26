import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeKeeper from 'react-timekeeper';
import Switch from "react-switch";
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput, Badge } from 'reactstrap';
import PreviewPicture from './PreviewPicture';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// Always use Moment for dates.
const now = moment(); // We get back an instance of moment (an individual moment).



export default class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                description: props.event ? props.event.description : '',
                note: props.event ? props.event.note : '',
                amount: props.event ? (props.event.amount / 100).toString() : '',
                createdAt: props.event ? moment(props.event.createdAt) : moment(), 
                calendarFocused: false,
                error: '',
                time:  props.event ? props.event.time: '12:00am',
                checked: true,
                public_event: props.event ? props.event.public_event : true,
                picture: props.event? props.event.picture : null,
                pictureUrl: props.event? props.event.pictureUrl : null,
                address: props.event ? props.event.address : '',
        };
    }
     // State Object
    handleChangeStatus = ({ meta, file }, status) => { 
        //console.log(status, meta, file)     
    }
    
    handleSubmit = (files) => {
        //console.log(files[0].file);
        const reader = new FileReader();
        const bobby = files[0].file;
        
        reader.onloadend = () => {
            this.setState({
                picture: bobby,
                pictureUrl: reader.result
            })
        }
        reader.readAsDataURL(bobby);
    }

     displayPicture = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        //console.log(file);
        reader.onloadend = () => {
            this.setState({
                picture: file,
                pictureUrl: reader.result
            });
        };
        
        reader.readAsDataURL(file);
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note })); //Implictly return the object
    }

    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({ createdAt }))
        };
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    
    onTimeChange = (time) => {
        
        const newTime = time.formatted
        this.setState(() => ({ time: newTime }))
    }

    handleChange = (checked) => {
        
        this.setState(() => ({ checked }));
        this.state.public_event = checked
        //console.log(this.state.public_event)
    }

    handleAddressChange = address => {
        this.setState({ address });
    };

    handleAddressSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };


    // Setting up the handler
    onSubmit = (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        if(!this.state.description || !this.state.amount || !this.state.time){ //|| !this.state.newtime
            // Set error state equal to 'Please provide description and amount'
            this.setState(() => ({ error: 'Please provide a description, event entry cost and time.' }));
        } else {
            // Clear the error
            this.setState(() => ({ error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
                time: this.state.time,
                public_event: this.state.public_event,
                picture: this.state.picture,
                pictueUrl: this.state.pictureUrl
            });
        }
    };

    render() {
        const { label, required, input } = this.props;
        return (
            
            <div className="container">
                {this.state.error && <p>{this.state.error}</p>}
            <Row className="justify-content-center">
            <Col xs="12" md="6" lg="8">
            <h1 className="event-form_master"><Badge color="primary">Create Your Event</Badge></h1>
            </Col>
            </Row>
            <Row className="justify-content-center">

                <Col xs="12" md="6" lg="8">
                    <PreviewPicture pictureUrl = {this.state.pictureUrl}/>
                    
                    <Dropzone 
                        
                        onChangeStatus={this.handleChangeStatus}
                        onSubmit={this.handleSubmit}
                        accept="image/*"
                        
                        inputContent="Upload a Hero Event Image"
                        
                    />
                    
                </Col>
            </Row>

            <form onSubmit={this.onSubmit}>
            <Row className="justify-content-center">
                <Col xs="12" md="6" lg="8">
                <div>
                
                <h1 className="event-form_master"><Badge color="primary">Event Title</Badge></h1>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Short and Sweet"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                </div>
                
                <div>
                <h1 className="event-form_master"><Badge color="primary">Ticket Price</Badge></h1>
                <input
                    className="input-field"
                    type="number"
                    placeholder="$"
                    value={this.state.amount}
                    onChange={this.onAmountChange}

                />
                </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
            <Col xs="12" md="5" lg="4">
                    
                    <h1 className="event-form_master"><Badge color="primary">Event Time</Badge></h1>
                    <TimeKeeper
                        time={this.state.time}
                        onChange={this.onTimeChange}
                        switchToMinuteOnHourSelect={true}
                        
                    />
                    
                </Col>
                <Col xs="12" md="5" lg="4">
                    
                    <h1 className="event-form_master"><Badge color="primary">Event Date</Badge></h1>
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    
                </Col>
                
                
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" md="6" lg="8">
                <h1 className="event-form_master"><Badge color="primary">Event Description</Badge></h1>
                <textarea
                    className="input-field_create"
                    placeholder="Add a description for your event."
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" md="6" lg="8">
                <h1 className="event-form_master"><Badge color="primary">Public Event?</Badge></h1>
                <div>
                <Switch 
                    checked={this.state.checked}   
                    onChange={this.handleChange} 
                />
                </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="12" md="6" lg="8">
                <Button className="input-field__padder btn-block btn-lg" color="info">
                    Finish
                </Button>
                </Col>
            </Row>      
            </form>
            {/* <Row className="justify-content-center">
                <Col xs="12" md="6" lg="8">
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleAddressChange}
                        onSelect={this.handleAddressSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                        <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                </Col>
            </Row> */}

        </div>
        
        )
    }
};
