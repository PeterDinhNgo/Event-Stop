import React from 'react';
import PreviewPicture from './PreviewPicture';

class FileField extends React.Component {
    constructor(state){
        super(state);

        this.state = {
            picture: null,
            pictureUrl: null
        }
    }
    
    displayPicture(e){
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                picture: file,
                pictureUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
        console.log(this.state.picture);
        console.log(this.state.pictureUrl);
    }

    render(){
        const { label, required, input } = this.props;
        return (
            <div>
               <div>
                   <label>{`${label} ${required ? '*' : ''}`}</label>
                   <div>
                       <input 
                            type="file" 
                            className="form-control" 
                            {...input}
                            onChange={(e) =>{
                                this.displayPicture(e);
                            }} 
                            />
                        <PreviewPicture 
                            pictureUrl = {this.state.pictureUrl}
                        />
                   </div>
                  
               </div>
            </div>
        )
    }
}

export default FileField;