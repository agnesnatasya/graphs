import React, { Component } from 'react';
import './App.css';
import { Theory } from "./components/Theory";
import { Regression } from "./components/Regression";
import { CodeForm } from './components/CodeForm';
import Amplify, { API } from "aws-amplify";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

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


export default function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-custom header-bar">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link">
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    TIME COMPLEXITY VISUALIZER
                  </Nav.Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/theory"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    TIME COMPLEXITY THEORY
                  </Nav.Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/regression"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    HOW THE VISUALIZER WORKS
                  </Nav.Link>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/theory">
            <Theory />
          </Route>
          <Route path="/regression">
            <Regression />
          </Route>
          <Route path="/">
            <CodeForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
