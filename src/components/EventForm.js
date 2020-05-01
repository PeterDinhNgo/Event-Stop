import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeKeeper from 'react-timekeeper';
import Switch from "react-switch";
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Always use Moment for dates.
const now = moment(); // We get back an instance of moment (an individual moment).
console.log(now.format('Do MMMM YYYY'))

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
                public_event: props.event ? props.event.public_event : true
        };
    }
     // State Object

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
                public_event: this.state.public_event
            });
        }
    };

    render() {
        
        return (
            
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
            <Row>
                <Col>
                <div>
                <h1>Event Title</h1>
                <input
                    className="input-field-title"
                    type="text"
                    placeholder="Title"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                </div>
                
                <div>
                <h1>Ticket Price</h1>
                <input
                    className="input-field-price"
                    type="number"
                    placeholder="Entry Cost"
                    value={this.state.amount}
                    onChange={this.onAmountChange}

                />
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <h1>Event Description</h1>
                <textarea
                    className="input-field-description"
                    placeholder="Add a description for your event."
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                </Col>
            </Row>
            <Row>
            <Col>
                <div>
                <h1>Event Time</h1>
                <TimeKeeper
                    time={this.state.time}
                    onChange={this.onTimeChange}
                    switchToMinuteOnHourSelect={true}
                    
                />
                </div>
            </Col>
            <Col>
                <div>
                <h1>Event Date</h1>
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                </div>
                </Col>
            </Row>
           
            <Row>
                <Col>
                <h2 className="input-field-public">Is this a Public Event?</h2>
                <div>
                <Switch 
                    checked={this.state.checked}   
                    onChange={this.handleChange} 
                />
                </div>
                </Col>
            </Row>
                {/* <TimePicker 
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    
                    onChange={this.onTimeChange}
                    value={this.state.time}
                /> */}
                <Col m={{ size: 6, order: 1 }}>
                <Button className="input-field__padder" color="info">
                    Finish
                </Button>
                </Col>
               
                </form>
            </div>
        
        )
    }
};
