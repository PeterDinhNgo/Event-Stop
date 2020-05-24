import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import privateEvents from '../../selectors/privateEvents';
import getVisibleEvents from '../../selectors/selectEvents';
import { Doughnut, Bar, Line, } from 'react-chartjs-2';
//import { Bar } from 'react-chartjs-2';

export const publicPrivateStat = ({ publicEventCount, eventCount }) => {
    const eventWord = publicEventCount === 1 ? 'Event' : 'Events';
    const doughnutData = {
        datasets: [{
            data: [publicEventCount, eventCount - publicEventCount],
            backgroundColor: ['rgb(168, 208, 230)', 'rgb(55, 71, 133)'],
            borderColor: ['rgb(168, 208, 230)', 'rgb(55, 71, 133)'],
        },
    ],
        labels: ['Public Events', 'Private Events']
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
                {
                label: 'Tickets Sold',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
    };
    
    return (
        <div>
        <Row>
            <Col xs="12" lg="6">
            <Doughnut 
                data={doughnutData}  
            />
            </Col>
            <Col xs="12" lg="6">
            <Bar 
                data={barData}
            />
            </Col>
        </Row>
            <Row>
            
            {/* <Col s={{ size: '7', order: 1 }}>
                <h1 className="filter-text-summary">You have {publicEventCount} Public {eventWord} scheduled coming up.</h1>
                <h1 className="filter-text-summary">You have {eventCount - publicEventCount} Private events scheduled coming up.</h1>
            </Col> */}
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    const totalPublicEvents = privateEvents(state.events, state.filters);
    const visibleEvents = getVisibleEvents(state.events, state.filters);
    return {
        publicEventCount: totalPublicEvents.length,
        eventCount: visibleEvents.length
    }
};

export default connect (mapStateToProps)(publicPrivateStat);