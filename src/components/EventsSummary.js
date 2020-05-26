import React from 'react';
import { connect } from 'react-redux';
import getVisibleEvents from '../selectors/selectEvents';
import { Container, Row, Col } from 'reactstrap';

export const EventsSummary = ({ eventCount }) => {
    const eventWord = eventCount === 1 ? 'Event' : 'Events';
    return (
        <div className="container">
        <Row>
        <Col s={{ size: '7', order: 1 }}>
            <h1 className="filter-text-summary">You have {eventCount} {eventWord} scheduled coming up.</h1>
        </Col>
        </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleEvents = getVisibleEvents(state.events, state.filters);

    return {
        eventCount: visibleEvents.length
    }
};

export default connect (mapStateToProps)(EventsSummary);