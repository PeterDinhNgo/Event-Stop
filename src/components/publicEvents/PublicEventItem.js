import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';


const PublicEventItem = ({ id, description, amount, createdAt, time, pictureUrl }) => (
    <div>
      <Card className="event-modal_cards">
      
          <CardImg top width="25%" src={pictureUrl} alt="Card image cap" className="event-modal_image"/>
      
        <CardBody >

          <CardTitle ><h1 className="hero-layout_modal_title"><Badge color="info">{description}</Badge></h1></CardTitle>
            <CardSubtitle>
              <p className="hero-layout_modal_timetitle">{moment(createdAt).format("ddd, MMM  DD, YYYY")}, {time}</p>
            </CardSubtitle>
              <CardText className="hero-layout_modal_price">{numeral(amount / 100).format('$0,0.00')}</CardText>

        </CardBody>
      </Card>
    </div>
);

export default PublicEventItem;