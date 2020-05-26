import React from 'react';
import EventForm from './EventForm'; //No need for {}brackets for class import only needed for const imports
import { connect } from 'react-redux';
import { startAddEvent } from '../actions/events';
import Header from './Header';
import { Badge } from 'reactstrap';

export class AddEventPage extends React.Component {
    onSubmit = (event) => {
        this.props.startAddEvent(event);
        this.props.history.push('/dashboard');
    };
    render() {
        return (
            <div>
                <Header />
                
                <EventForm
                    onSubmit={this.onSubmit}
                />
            </div>
            
        );
    }
}

 const mapDispatchToProps = (dispatch) => ({
     startAddEvent: (event) => dispatch(startAddEvent(event))
 });

export default connect(undefined, mapDispatchToProps)(AddEventPage); // we now have access to props.dispatch()

// connect this component to the Redux store so it can dispatch our action