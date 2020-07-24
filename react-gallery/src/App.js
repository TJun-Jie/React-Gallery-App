import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import {
   Switch,Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component{

  state =  {
    waterfallPhotos: [],
    leavesPhoto: [],
    searchQuery: '',
    searchPhotos: [],
    weedPhotos: []
  }

  getDataWaterfall() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      console.log(response)
      this.setState({
        waterfallPhotos: response.data.photos.photo
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }
  getDataLeaves() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=leaves&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        leavesPhoto: response.data.photos.photo
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }
  getDataWeed() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=weed&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        weedPhotos: response.data.photos.photo
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }



  performSearch = (query='deer') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        searchPhotos: response.data.photos.photo,
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }

  componentDidMount() {
    this.getDataWaterfall()
    this.getDataLeaves()

  }

  handleSearch= (query="deer") => {
    this.setState({
      searchQuery: query
    }, () => {
      // only search after saerchquery is updated
      this.performSearch(this.state.searchQuery)
    })
  }

  

  render() {

    return (
      
        <div className="Container">
          <SearchForm handleSearch={this.handleSearch} />
          
          <Nav /> 
          <Switch>
            <Route path="/search">
              <PhotoContainer photoArr={this.state.searchPhotos}></PhotoContainer>
            </Route>
            <Route path="/waterfall">
              <PhotoContainer photoArr={this.state.waterfallPhotos}></PhotoContainer>
            </Route>
            <Route path="/leaves">
              <PhotoContainer photoArr={this.state.leavesPhoto}></PhotoContainer>
            </Route>
            <Route path="/weed">
              <PhotoContainer photoArr={this.state.weedPhotos} ></PhotoContainer>
            </Route>
            
          </Switch>
        </div>
    );
  }
}

export default App;
