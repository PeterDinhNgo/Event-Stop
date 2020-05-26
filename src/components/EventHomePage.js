import React from 'react';
import EventList from './EventList';
import EventListFilters from './EventListFilters';
import EventsSummary from './EventsSummary';
import PublicPrivateStat from './dashboard/publicPrivateStat';
import Header from './Header';

const EventHomePage = () => (
    <div><Header/>
        <div className="dashboard">
        <PublicPrivateStat />
        <EventsSummary />
        <EventListFilters />
        <EventList />
        </div>
    </div>
    
);

export default EventHomePage;