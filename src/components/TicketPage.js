import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import PreviewPicture from './PreviewPicture';
import EventListItem from './EventListItem';
import getVisibleEvents from '../selectors/selectEvents';

class TicketPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            cart: 0,
            jsonData: [],
            title: '',
            pictureUrl: ''
        }
    }

    addToCart = (e) => {
        var user = firebase.auth().currentUser;
        const uid = user.uid;
        const id = this.props.events[0].id;
        console.log(id);
        axios.get(`https://event-stop.firebaseio.com/users/${uid}/events.json`).then(({data}) => {
            const titleA = []
            this.setState({ jsonData: data})
            console.log(data);
            const title = (data[Object.keys(data)[0]]).description;
            const pictureUrl = (data[Object.keys(data)[0]]).pictureUrl;
            //const title = b.description;
            this.setState({
                title: title,
                pictureUrl: pictureUrl
            })
        })
        const newCart = this.state.cart + 1;
        e.preventDefault();
        this.setState({
            cart: newCart
        })
        console.log(this.state.cart)
    }

    render(){
        
        return(
            <div>
                {
                    this.props.events.length === 0 ? (
                        <h1 className = "filter-text">No events</h1>
                        ) : (
                        this.props.events.map((event) => {
                                return <div key={event.id} className="col-sm-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <EventListItem key={event.id} {...event} />
                                                </div>
                                            </div>
                                        </div>      
                        })
                    )
                }
                <h1>
                    {this.state.title}
                    <PreviewPicture pictureUrl={this.state.pictureUrl}/>
                </h1>
                <button onClick={this.addToCart}>Add To Cart</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      events: getVisibleEvents(state.events, state.filters)
    };
};



export default connect(mapStateToProps)(TicketPage);