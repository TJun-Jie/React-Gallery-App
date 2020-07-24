import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import {
  BrowserRouter, Switch,Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component{

  state =  {
    catPhotos: [],
    dogPhotos: []
  }

  getDataCats() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      console.log(response)
      this.setState({
        catPhotos: response.data.photos.photo
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }
  getDataDogs() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        dogPhotos: response.data.photos.photo
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }

  componentDidMount() {
    console.log('mount')
    this.getDataCats()
    this.getDataDogs()

  }

  

  render() {
    return (
      <BrowserRouter>
        <div className="Container">
          <SearchForm />
          <Nav /> 
          <Switch>
            <Route path="/cats">
              <PhotoContainer photoArr={this.state.catPhotos}></PhotoContainer>
            </Route>
            <Route path="/dogs">
              <PhotoContainer photoArr={this.state.dogPhotos}></PhotoContainer>
            </Route>
            <Route path="/computers">
              <PhotoContainer></PhotoContainer>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
