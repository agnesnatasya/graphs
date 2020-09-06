import React, { Component } from 'react';
import './App.css';
import { Title } from "./components/Title";
import { CodeForm } from './components/CodeForm';


class App extends Component {

  render() {
    return (
      <div>
        <Title />
        <CodeForm />
      </div >
    );
  }
}


export default App;





