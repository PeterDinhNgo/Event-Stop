// Export a stateless functional component
// description, amount, createdAt

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';


const EventListItem = ({ id, description, amount, createdAt, time, pictureUrl }) => (
    <div>
    <Card>
        <CardImg top width="52%" src={pictureUrl} alt="Card image cap"/>
        <CardBody>

          <CardTitle><p className="dashboard_card_title">{description}</p></CardTitle>
          <CardSubtitle><p className="dashboard_card_date">{moment(createdAt).format("ddd, MMM  DD, YYYY")}, {time}</p></CardSubtitle>
          <CardText className="dashboard_card_price">{numeral(amount / 100).format('$0,0.00')}</CardText>
          
        </CardBody>
        <CardFooter>
          <Button href={`/edit/${id}`} size="lg">Edit Event</Button>
        </CardFooter>
      </Card>    
    </div>
);

export default EventListItem;