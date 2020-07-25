import React, {Component} from 'react';
import Photo from './Photo';

export default class PhotoContainer extends Component {
    state = {
        loading: this.props.loading
    }

    createPhoto = () => {     
        return this.props.photoArr.map(photo => (
            <Photo key={photo.id} farm={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret}/>
        ))   
    }
      
    render() {
        const tag= this.props.match.params.tag

        return(
            <div className="photo-container ">
                {this.props.photoArr.length > 0?  <h2>{`${this.props.name}`} Pictures</h2>: ''}
                {/* when there are no search results and is not loading, load no results found */}
                {(this.props.photoArr.length < 1 && !this.state.loading)  ? 
                    (<div className="noResults">
                    <h3>No results found</h3>
                    <h5> The search did not return any results, please try again</h5>
                    </div>): ''}
                {/* when searchquery is not the same as the params tag */}
                {(tag  && (tag !== this.props.searchQuery)) ? 
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