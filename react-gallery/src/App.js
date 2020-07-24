import React from 'react';
import './App.css';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

function App() {
  return (
    <div className="Container">
      <Nav /> 
      <PhotoContainer />
    </div>
  );
}

export default App;
