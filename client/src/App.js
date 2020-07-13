import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PythonForm } from './components/PythonForm';

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">TIME COMPLEXITY VISUALIZER</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/submit" />
        <Route exact path="/" component={PythonForm} />
      </div >
    );
  }
}


export default App;





