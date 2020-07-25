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
    loading: false,
    params: ''
  }



  performSearch = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        searchPhotos: response.data.photos.photo,
        loading:false,
      })
    })
    .catch(err => {
      console.log("Error parsing and fetching data")
    })
  }

  // componentDidMount() {
  //   this.getDataWaterfall();
  //   this.getDataLeaves();
  //   this.getDataWeed();
  //   this.performSearch();

  // }

  handleSearch= (query) => {
    this.setState({
      searchQuery: query
    }, () => {
      // only search after saerchquery is updated
      // this.performSearch(this.state.searchQuery)
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
              <Route exact path="/" render={() => <PhotoContainer tags='deer'/> } />
              <Route exact path="/search/:tag" render={(props) => <PhotoContainer tags={this.state.searchQuery}/>}  />
              <Route exact path="/waterfall" render={() => <PhotoContainer tags='Waterfall'/> } />
              <Route exact path="/leaves" render={() => <PhotoContainer tags='Leaves'/> } />
              <Route exact path="/weed" render={() => <PhotoContainer tags='Weed'/> } />
     
            </Switch>

          </BrowserRouter>
    );
  }
}

export default App;
