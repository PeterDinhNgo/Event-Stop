import React from 'react';
import EventList from './EventList';
import EventListFilters from './EventListFilters';
import EventsSummary from './EventsSummary';
import Header from './Header';
import { Container, Row, Col } from 'reactstrap';

const EventHomePage = () => (
    <div>
        <Header />
        <EventsSummary />
        <EventListFilters />
        <EventList />
    </div>
    
);

export default EventHomePage;