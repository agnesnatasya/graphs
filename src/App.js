import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { PythonForm } from './components/PythonForm';

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/submit" />
        <Route exact path="/" component={PythonForm} />
      </div >
    );
  }
}


export default App;





