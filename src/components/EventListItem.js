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


const EventListItem = ({ id, description, amount, createdAt, time }) => (
    <div>
    <Card>
        <CardImg top width="52%" src="/images/6.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle><p>{description}</p></CardTitle>
          <CardSubtitle><p>{moment(createdAt).format("ddd, MMM  DD, YYYY")}, {time}</p></CardSubtitle>
          <CardText>{numeral(amount / 100).format('$0,0.00')}</CardText>
          <Button href={`/edit/${id}`}>Button</Button>
        </CardBody>
        <CardFooter>
        <Button>Buy Tickets</Button>
        </CardFooter>
      </Card>

    {/* <Toast>
    <Media>
        <Media left href={`/edit/${id}`}>
            <Media object src="/images/place_holder.jpg" alt="Generic placeholder image" />
        </Media>
      <Media body>
        <Media heading >
            <p>{description}</p>
            <p>{moment(createdAt).format("ddd, MMM  DD, YYYY")}, {time}</p>
        </Media>
        {numeral(amount / 100).format('$0,0.00')} 
        <p> </p>
        <p> </p>
        <p> </p>
      </Media>
    </Media>
    </Toast> */}
    
    </div>
);

export default EventListItem;