import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner, Container } from "react-bootstrap";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";

export class PythonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { code: "", coord: null, exponential: 0, polynomial: 0, logarithm: 0, isFetching: false };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleStateOnResponse = this.handleStateOnResponse.bind(this);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 9) { // tab was pressed
      event.preventDefault();
      var val = this.state.code,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;
      this.setState(
        {
          "code": val.substring(0, start) + '  ' + val.substring(end)
        }
      )
    }
  }

  handleStateOnResponse = (text) => {
    console.log(text)
    console.log(JSON.parse(text).coord);
    console.log("A")
    console.log(JSON.parse(text).equation);
    console.log("A");
    this.setState({
      coord: JSON.parse(text).coord,
      exponential: JSON.parse(text).equation.exponential,
      polynomial: JSON.parse(text).equation.polynomial,
      logarithm: JSON.parse(text).equation.logarithm,
      isFetching: false
    });
  }

  handleOnClick = async () => {
    this.setState({ isFetching: true })
    const post = { code: this.state.code };
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(function (response) {
        return response.text();
      })
      .then(this.handleStateOnResponse);
  }


  codeForm = () => {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <h3>Write your code!</h3>

          <Form.Control
            as="textarea" rows="15"
            placeholder="Put your code here"
            value={this.state.code}
            onChange={(e) => this.setState({ code: e.target.value })}
            onKeyDown={this.handleKeyDown}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={this.handleOnClick}
        >
          Calculate!
        </Button>
      </Form>
    );
  }

  chart = () => {
    return (
      <VictoryChart style={{
        parent: {
          maxWidth: "50%", margin: "auto"
        }
      }} polar={false} height={400} width={400}>
        <VictoryLine
          interpolation="natural" data={this.state.coord}
          style={{ data: { stroke: "#c43a31" } }}
        />
        <VictoryScatter data={this.state.coord}
          size={3}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    )
  }

  equation = (exponential, polynomial, logarithm) => {
    var Latex = require('react-latex');
    var tag = '$$';
    var addition = ' + ';
    var polynomialTerm =
      polynomial > 1 ?
        `x^${polynomial}`
        : polynomial === 1 ?
          `x`
          : '';
    var logarithmTerm =
      logarithm > 1 ?
        `log^${logarithm}{y}`
        : logarithm === 1 ?
          `log{x}`
          : '';
    var exponentialTerm =
      exponential > 1 ?
        `${exponential}^x`
        : exponential === 1 ?
          (logarithm || polynomial) ? ""
            : '1'
          : '';
    var joinedTerms = ([exponentialTerm, polynomialTerm, logarithmTerm].filter(x => x)).join(addition);
    var equation = tag + joinedTerms + tag;

    return <Latex displayMode={true}>{equation}</Latex>;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.codeForm()}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isFetching ? <Spinner animation="border" /> : null}
            {this.state.coord ? this.chart() : null}
            {this.equation(this.state.exponential, this.state.polynomial, this.state.logarithm)}
          </Col>
        </Row>
      </Container >
    );
  };
}
