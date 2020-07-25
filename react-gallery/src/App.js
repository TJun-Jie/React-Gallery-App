import React, {Component} from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from './components/SearchForm';
import NotFound from './components/NotFound';

class App extends Component{
  state =  {
    waterfallPhotos: [],
    leavesPhoto: [],
    searchQuery: '',
    searchPhotos: [],
    weedPhotos: [],
    loading: true
  }

    getData() {
      const waterFall = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
      const leaves = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=leaves&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
      const weed = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=weed&per_page=24&in_gallery=true&format=json&nojsoncallback=1`)
      axios.all([waterFall, leaves, weed]).then(axios.spread((...responses) => {
        const waterfallData = responses[0].data.photos.photo
        const leavesData = responses[1].data.photos.photo
        const weedData = responses[2].data.photos.photo
        this.setState({
          leavesPhoto: leavesData,
          waterfallPhotos: waterfallData,
          weedPhotos: weedData,
          loading: false
        })
      })).catch(errors => {
        console.log("Error parsing and fetching data")
      })
      
    }

  // fetch data by searchQuery state as the tag 
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
  
  // Set state of search query by getting data from search form
  handleSearch= (query) => {
    this.setState({
      searchQuery: query
    }, () => {
      // only search after saerchquery is updated
      this.performSearch(this.state.searchQuery)
    })  
  }
  // Load whenever page refreshes
  componentDidMount() {
    this.getData();
    this.performSearch();
  }
  render() {
    return (
          <BrowserRouter>
            <SearchForm handleSearch={this.handleSearch} />
            <Nav />
            {/* If is loading, show the loading animation */}
            {this.state.loading
              ? <div className="loader"></div>
              : ''
            }
            <Switch>
              <Route exact path="/" render={() => <PhotoContainer photoArr={this.state.searchPhotos} name={this.state.searchQuery}/> } />
              <Route exact path="/search/:tag" render={(props) => <PhotoContainer photoArr={this.state.searchPhotos} match={props.match} name={this.state.searchQuery} loading={this.state.loading}/> } />
              <Route exact path="/waterfall" render={() => <PhotoContainer photoArr={this.state.waterfallPhotos} name='Waterfall'/> } />
              <Route exact path="/leaves" render={() => <PhotoContainer photoArr={this.state.leavesPhoto} name='Leaves'/> } />
              <Route exact path="/weed" render={() => <PhotoContainer photoArr={this.state.weedPhotos} name='Weed'/> } />
              <Route component={NotFound} ></Route>   
            </Switch>
          </BrowserRouter>
    );
  }
}
export default App;
