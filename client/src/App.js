import React, { Component } from 'react';
import './App.css';
import { HeaderBar } from "./components/HeaderBar";
import { CodeForm } from './components/CodeForm';


class App extends Component {

  render() {
    return (
      <div>
        <HeaderBar />
        <CodeForm />
      </div >
    );
  }
}


export default App;





