import React from 'react';
import { connect } from 'react-redux';
import SimpleImageSlider from "react-simple-image-slider";

class EventImageSlider extends React.Component {
    render() {
        const images = [
            { url: "/images/1.jpg" },
            { url: "/images/2.jpg" },
            { url: "/images/3.jpg" },
            { url: "/images/4.jpg" },
        ];

        return (
            
       <div>
                <SimpleImageSlider
                    width={1920}
                    height={1080}
                    images={images}
                />
            </div>
            
        );
    }
}



export default connect()(EventImageSlider);