import React from 'react';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { startEditEvent } from '../actions/events';
import { startRemoveEvent } from '../actions/events';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import LoggedInHeader from './LoggedInHeader';


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
                <LoggedInHeader />
                <EventForm
                    event={this.props.event}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
                <div>
                    <FacebookShareButton children={<FacebookIcon />} url={`http://eventstop.herokuapp.com/edit/${this.props.event.id}`}/>
                    <WhatsappShareButton children={<WhatsappIcon />} url={`http://eventstop.herokuapp.com/edit/${this.props.event.id}`}/>
                    <TwitterShareButton children={<TwitterIcon />} url={`http://eventstop.herokuapp.com/edit/${this.props.event.id}`}/>
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