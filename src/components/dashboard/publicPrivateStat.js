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
            backgroundColor: ['rgba(42, 94, 133, 0.4)', 'rgb(54, 52, 53, 0.4)'],
            borderColor: ['rgba(42, 94, 133, 1)', 'rgba(54, 52, 53, 1)'],
        },
    ],
        labels: ['Public Events', 'Private Events']
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
                    {
                    label: 'Tickets Sold',
                    backgroundColor: 'rgba(42, 94, 133, 0.2)',
                    borderColor: 'rgba(42, 94, 133, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(59, 227, 224,0.4)',
                    hoverBorderColor: 'rgba(59, 227, 224,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
    };
    
    return (
        <div className="dashboard_charts">
            <div className="container">
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
            </div>
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