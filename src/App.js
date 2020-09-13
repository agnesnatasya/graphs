import React, { Component } from 'react';
import './App.css';
import { Title } from "./components/Title";
import { CodeForm } from './components/CodeForm';
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);


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





