import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignUp } from './components/SignUp';
import { PostForm } from './components/PostForm';

class App extends Component {
  render() {
    return (
      <Container>
        <Route exact path="/submit" component={<Result />} />
        <Route exact path="/" component={<PythonForm />} />
      </Container>
    );
  }
}


export default App;





