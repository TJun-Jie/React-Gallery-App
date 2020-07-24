import React, {Component} from 'react';
import Photo from './Photo';

export default class PhotoContainer extends Component {

    state = {
        link: null
    }
    render() {
        return(
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    <Photo />
                </ul>
            </div>
        )
    }
}