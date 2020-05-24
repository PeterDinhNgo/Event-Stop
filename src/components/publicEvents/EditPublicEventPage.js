import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import PreviewPicture from '../PreviewPicture';

export class EditPublicEventPage extends React.Component {
    constructor(props){
        super(props)

        this.state={
            key: '',
            title: '',
            note: '',
            pictureUrl: '',
            amount: '',
            date: 0,
            time: '',
            dialogOpen: false,
            modal: false
        };
    }

    componentDidMount(){
        const searchID = this.props.match.params.id;
        axios.get(`https://event-stop.firebaseio.com/public_events/${searchID}.json`).then(({ data }) => {
            console.log(data);
            const title = data.description;
            const note = data.note;
            const pictureUrl = data.pictureUrl;
            const amount = data.amount;
            const date = data.createdAt;
            const time = data.time;
            this.setState({
                title: title,
                note: note,
                pictureUrl: pictureUrl,
                amount: parseFloat(amount, 10) / 100,
                date: date,
                time: time,
                modal: true
            });
        })
    }
 
    render() {
        return (
            <div>
                
                <Header />
               
                <Container>
                
                <Col sm={{ size: 'auto'}}>  
                    <h1>{this.state.title === '' ? <div className="spinner-border text-info" role="status"> 
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : this.state.title}
                    </h1>
                </Col>
                <Col>
                    {this.state.pictureUrl === '' ? <div className="spinner-border text-info" role="status"> 
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : <PreviewPicture pictureUrl={this.state.pictureUrl}/>}
                    
                </Col>
                <Col>
                    {this.state.amount === '' ? <div className="spinner-border text-info" role="status"> 
                                                        <span className="sr-only">Loading...</span>
                                                    </div> : <h3>Price ${this.state.amount}</h3>}
                </Col>
                </Container>    
               
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        event: state.events.find((event) => event.id === props.match.params.id)  
    }
};




export default connect(mapStateToProps)(EditPublicEventPage);