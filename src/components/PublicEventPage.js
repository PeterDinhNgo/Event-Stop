import React from 'react';
import { connect } from 'react-redux';
import PublicEventForm from './EventForm';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import LoggedInHeader from './LoggedInHeader';


export class PublicEventPage extends React.Component {
    
    onRemove = () => { //Head back home
        this.props.history.push('/');
    };
    render() {
        return (
            
            <div>
                <LoggedInHeader />
                <PublicEventForm
                    event={this.props.event}
                />
                <button onClick={this.onRemove}>Remove</button>
                <div>
                     <FacebookShareButton children={<FacebookIcon />} url={`http://eventstop.herokuapp.com/view/${this.props.event.id}`}/>
                    <WhatsappShareButton children={<WhatsappIcon />} url={`http://eventstop.herokuapp.com/view/${this.props.event.id}`}/>
                    <TwitterShareButton children={<TwitterIcon />} url={`http://eventstop.herokuapp.com/view/${this.props.event.id}`}/> 
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



export default connect(mapStateToProps)(PublicEventPage);