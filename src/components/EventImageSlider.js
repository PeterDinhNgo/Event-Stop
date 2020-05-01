import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class EventImageSlider extends React.Component {
    render() {
        return (
            
            <Carousel showArrows={true} showThumbs={false} showStatus={false}>
                <div>
                    <img src="/images/1.jpg" />
                    <p className="legend">Movies at the Dreshall Gardens</p>
                </div>
                <div>
                    <img src="/images/2.jpg" />
                    <p className="legend">Tough Mudder Winter 2020</p>
                </div>
                <div>
                    <img src="/images/3.jpg" />
                    <p className="legend">TED Talk Comes to Sydney</p>
                </div>
                <div>
                    <img src="/images/4.jpg" />
                    <p className="legend">City to Surf Marathon</p>
                </div>
                <div>
                    <img src="/images/5.jpg" />
                    <p className="legend">Virtual Yoga - Be Zen</p>
                </div>
                
            </Carousel>
            
        );
    }
}



export default connect()(EventImageSlider);