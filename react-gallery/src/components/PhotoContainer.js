import React, {Component} from 'react';
import Photo from './Photo';
import apiKey from '../config';
import axios from 'axios';
export default class PhotoContainer extends Component {

    state = {
        loading: null,
        photoArr: []
    }

    getData= (tags) => {
        this.setState({
          loading: true
        })
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            photoArr: response.data.photos.photo,
            loading: false
          })
        })
        .catch(err => {
          console.log("Error parsing and fetching data")
        })
      }

    createPhoto = () => {
        
        return this.state.photoArr.map(photo => (
            <Photo key={photo.id} farm={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret}/>
        ))
        
        // No photos found

        
    }

    componentDidMount() {
        console.log("Component did mount")
        this.getData(this.props.tags);
    }
    

    
    render() {
        return(
            <div className="photo-container ">
                {this.state.photoArr.length > 0?  <h2>{`${this.state.tags}`} Pictures</h2>: ''}
                {this.state.photoArr.length < 1 && !this.state.loading? 
                    (<div className="noResults">
                    <h3>No results found</h3>
                    <h5> The search did not return any results, please try again</h5>
                    </div>): ''}
                <ul>
                   {this.createPhoto()} 
                </ul>
            </div>
        )
    }
}