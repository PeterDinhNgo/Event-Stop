import React from 'react';
import { Spinner } from 'reactstrap';

const PreviewPicture = (props) => {
    
    const { pictureUrl } = props;
    return (
        <div>
            <img className="img-fluid mb-2 mt-2" src={pictureUrl}/>
        </div>
            
        
    )
}

export default PreviewPicture;