import React from 'react';
import { connect } from 'react-redux';
import PublicEventItem from './PublicEventItem';
import getVisibleEvents from '../../selectors/selectEvents';
import { startSetPublicEvents } from '../../actions/events';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Row, Col } from 'reactstrap';
import moment from 'moment';
import PreviewPicture from '../PreviewPicture';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';


toast.configure();

export class PublicEventsList extends React.Component {
    constructor(props){
        super(props)

        this.state={
            id: '',
            key: '',
            title: '',
            note: '',
            pictureUrl: '',
            amount: '',
            date: 0,
            time: '',
            dialogOpen: false,
            modal: false,
            product: {
                name: "",
                price: 0
            }
        };

    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    openInfoPage = (e) => {
        const id = e.target.getAttribute('value');
        
        axios.get(`https://event-stop.firebaseio.com/public_events/${id}.json`).then(({data}) => {
            const title = data.description;
            const note = data.note;
            const pictureUrl = data.pictureUrl;
            const amount = data.amount;
            const date = data.createdAt;
            const time = data.time;
            this.setState({
                id: id,
                title: title,
                note: note,
                pictureUrl: pictureUrl,
                amount: parseFloat(amount, 10) / 100,
                date: date,
                time: time,
                modal: true,
                product: {
                    name: title,
                    price: amount
                }
            });
        });
    };

    
      
    handleToken = async (token, addresses) => {
        const response = await axios.post('/signed_in/home', { token, product: this.state.product });
        const { status } = response.data;
        
        if (status === 'success') {
            toast('Success!, Check your email for more details!', { type: 'success'})
        } else {
            toast('Denied!, Please try again', { type: 'error'})
        }
    }

    render(){
        
        return(
            <div>
                <div className="row" >
            {
                this.props.events.length === 0 ? ( <h1 className = "filter-text">No events</h1> ) : (
                this.props.events.map((event) => {
                    return <div key={event.id} className="col-xl-3">
                                <Card className="event-modal_cards shadow p-3 mb-5 bg-white rounded">
                                    <div className="card-body">
                                        <PublicEventItem key={event.id} {...event} />
                                        {/* <button className="event-modal_tickets" value={event.id} onClick={this.openInfoPage}>Buy Tickets</button> */}
                                        <div className="text-center event-modal_tickets">
                                        <Button className="event-modal_tickets" size="lg" color="info" value={event.id} onClick={this.openInfoPage}>Buy Tickets</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>      
                })
            )}  
                </div>
                
            {this.state.modal ?  <Modal isOpen={this.state.modal} toggle={this.toggle} id={this.state.title}>
                                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                                        <PreviewPicture pictureUrl={this.state.pictureUrl}/>
                                            <ModalBody>
                                                <h1>${this.state.amount}.00</h1>
                                                <h2>{this.state.date}</h2>
                                                <h3>{this.state.note}</h3>
                                                <Button color="primary" onClick={this.toggle}>View</Button>
                                                <div>
                                                    <FacebookShareButton children={<FacebookIcon />} url={`https://eventstop.herokuapp.com/viewer/${this.state.id}`}/>
                                                    <WhatsappShareButton children={<WhatsappIcon />} url={`https://eventstop.herokuapp.com/viewer/${this.state.id}`}/>
                                                    <TwitterShareButton children={<TwitterIcon />} url={`https://eventstop.herokuapp.com/viewer/${this.state.id}`}/>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                            
                                                <StripeCheckout 
                                                    stripeKey="pk_test_bIqMrvHAd2maXEcg6FEofAQv000aRl1aC6"
                                                    token={this.handleToken}
                                                    amount={this.state.product.price * 100}
                                                    name="test"
                                                    billingAddress
                                                    shippingAddress
                                                />
                                            </ModalFooter>
                                </Modal>: null}
                
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
      events: getVisibleEvents(state.events, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetPublicEvents: () => dispatch(startSetPublicEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventsList);

