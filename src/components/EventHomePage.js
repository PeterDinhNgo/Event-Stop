import React from 'react';
import EventList from './EventList';
import EventListFilters from './EventListFilters';
import EventsSummary from './EventsSummary';
import Header from './Header';

const EventHomePage = () => (
    <div>
        <Header />
        <EventsSummary />
        <EventListFilters />
        <EventList />
    </div>
    
);

export default EventHomePage;