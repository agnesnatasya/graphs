import React, { Component } from 'react';
import './App.css';
import { Title } from "./components/Title";
import { CodeForm } from './components/CodeForm';
import Amplify, { API } from "aws-amplify";

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "timeComplexity",
        endpoint: "https://okpl2px1ub.execute-api.us-east-1.amazonaws.com/prod",
      },
    ],
  },
});


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





