import React from 'react';
import { connect } from 'react-redux';
import EventForm from '../EventForm';

export class PublicEventInfo extends React.Component {
    onComponentMount(){
        this.props.startSetPublicEvents();
    }
    onSubmit = (event) => {
        this.props.startEditEvent(this.props.event.id, event);
        this.props.history.push('/');
    };
    render(){
        console.log(this.props.event);
        return(
            <div>
                
                <EventForm
                    event={this.props.event}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        event: state.events
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSetPublicEvents: () => dispatch(startSetPublicEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventInfo);