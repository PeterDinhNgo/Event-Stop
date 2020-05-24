import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


const PublicEventItem = ({ id, description, amount, createdAt, time, pictureUrl }) => (
    <div>
      <Card className="event-modal_cards">
      
          <CardImg top width="25%" src={pictureUrl} alt="Card image cap" className="event-modal_image"/>
      
        <CardBody >

          <CardTitle ><h1 className="event-modal_cards_title">{description}</h1></CardTitle>
            <CardSubtitle><p>{moment(createdAt).format("ddd, MMM  DD, YYYY")}, {time}</p></CardSubtitle>
              <CardText className="event-modal_cards_price">{numeral(amount / 100).format('$0,0.00')}</CardText>

        </CardBody>
      </Card>
    </div>
);

export default PublicEventItem;