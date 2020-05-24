import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeKeeper from 'react-timekeeper';
import Switch from "react-switch";
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import PreviewPicture from './PreviewPicture';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
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
                public_event: props.event ? props.event.public_event : true,
                picture: props.event? props.event.picture : null,
                pictureUrl: props.event? props.event.pictureUrl : null
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
            
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <Row>
                <PreviewPicture pictureUrl = {this.state.pictureUrl}/>
                <Dropzone 
                    onChangeStatus={this.handleChangeStatus}
                    onSubmit={this.handleSubmit}
                    accept="image/*"
                    
                    inputContent="Drag and Drop an Event Image"
                    styles={{
                        dropzone: { width: 400, height: 250 },
                        dropzoneActive: { borderColor: 'green' },
                    }}
                />
            </Row>
                <form onSubmit={this.onSubmit}>
            <Row>
                <Col sm={{size: 12, offset: 2}} md={{size: 12, offset: 3 }} lg={{size: 12, offset: 4}}>
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
                <Col lg={{size: 12, offset: 4}}>
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
                <div>
                    <Label for="exampleCustomFileBrowser">File Browser</Label>
                    <CustomInput 
                        type="file" 
                        id="exampleCustomFileBrowser" 
                        name="customFile" 
                        {...input}
                        onChange={(e) => {this.displayPicture(e);}}
                    />
                    <PreviewPicture 
                            pictureUrl = {this.state.pictureUrl}
                    />
                </div>
                {/* <Row>
                    <div class="input-group mb-3">
                        <input 
                            type="file" 
                            className="form-control" 
                            {...input}
                            onChange={(e) => {this.displayPicture(e);}} 
                        />
                        <PreviewPicture 
                            pictureUrl = {this.state.pictureUrl}
                        />
                    </div>
                </Row> */}
                
                
            </div>
        
        )
    }
};
