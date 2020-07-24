import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import {
   Switch,Route, BrowserRouter
} from 'react-router-dom';
import axios from 'axios';

class App extends Component{

  state =  {
    waterfallPhotos: [],
    leavesPhoto: [],
    searchQuery: '',
    searchPhotos: [],
    weedPhotos: [],
    loading: true
  }

  getDataWaterfall() {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        waterfallPhotos: response.data.photos.photo,
        loading: false
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }
  getDataLeaves() {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=leaves&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        leavesPhoto: response.data.photos.photo,
        loading: false
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }
  getDataWeed() {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=weed&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        weedPhotos: response.data.photos.photo,
        loading: false
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }



  performSearch = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        searchPhotos: response.data.photos.photo,
        loading:false
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }

  componentDidMount() {
    this.getDataWaterfall();
    this.getDataLeaves();
    this.getDataWeed();
    this.performSearch();

  }

  handleSearch= (query) => {
    this.setState({
      searchQuery: query
    }, () => {
      // only search after saerchquery is updated
      this.performSearch(this.state.searchQuery)
    })
    
  }

  render() {

    return (
      
          <BrowserRouter>
            <SearchForm handleSearch={this.handleSearch} />
            <Nav />
            {this.state.loading
              ? <div className="loader"></div>
              : ''
            }
            <Switch>
              <Route exact path="/" render={() => <PhotoContainer photoArr={this.state.searchPhotos} name={this.state.searchQuery}/> } />
              <Route exact path="/search/:tag" render={() => <PhotoContainer photoArr={this.state.searchPhotos} name={this.state.searchQuery} loading={this.state.loading}/> } />
              <Route exact path="/waterfall" render={() => <PhotoContainer photoArr={this.state.waterfallPhotos} name='Waterfall'/> } />
              <Route exact path="/leaves" render={() => <PhotoContainer photoArr={this.state.leavesPhoto} name='Leaves'/> } />
              <Route exact path="/weed" render={() => <PhotoContainer photoArr={this.state.weedPhotos} name='Weed'/> } />
     
            </Switch>

          </BrowserRouter>
    );
  }
}

export default App;
