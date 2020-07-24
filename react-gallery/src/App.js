import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import SearchForm from './components/SearchForm';

class App extends Component{

  

  render() {
    return (
      <div className="Container">
        <SearchForm />
        <Nav /> 
        <PhotoContainer />
      </div>
    );
  }
}

export default App;
