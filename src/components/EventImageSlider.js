import React from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';

class EventImageSlider extends React.Component {
    render() {
        const images = [
            {
                src: "/images/1.jpg",                
                altText: 'Slide 1',
                caption: '',
                header: 'Movies in the Park',
                key: '1'
              },
              {
                src: "/images/2.jpg",
                altText: 'Slide 2',
                caption: '',
                header: 'Tough Mudder Winter 2020',
                key: '2'
              },
              {
                src: "/images/3.jpg",
                altText: 'Slide 2',
                caption: '',
                header: 'TED Talk Comes to Sydney',
                key: '3'
              },
              {
                src: "/images/4.jpg",
                altText: 'Slide 2',
                caption: '',
                header: 'City to Surf Marathon',
                key: '4'
              },
              {
                src: "/images/5.jpg",
                altText: 'Slide 2',
                caption: '',
                header: 'Virtual Yoga - Be Zen',
                key: '5'
              }

        ];

        return (
            
        <div>

            <Col>
            <UncontrolledCarousel items={images} autoPlay={false}/>
    
            </Col>
        </div>
            
        );
    }
}



export default connect()(EventImageSlider);