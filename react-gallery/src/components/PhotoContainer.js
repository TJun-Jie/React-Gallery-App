import React, {Component} from 'react';
import Photo from './Photo';

export default class PhotoContainer extends Component {

    state = {
        link: null
    }

    createPhoto = () => {
        return this.props.photoArr.map(photo => (
            <Photo key={photo.id} farm={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret}/>
        ))
    }
    

    
    render() {
        return(
            <div className="photo-container ">
                <h2>Results</h2>
                <ul>
                   {this.createPhoto()} 
                </ul>
            </div>
        )
    }
}