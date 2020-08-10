import React from "react";
import { Form, Row, Col, Button, Spinner, Container } from "react-bootstrap";
import { chart } from './Chart.js';
import { equation } from './Equation.js';
import "./CodeForm.css";

export class CodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", coord: null, exponential: 0, polynomial: 0, logarithm: 0, isFetching: false };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleStateOnResponse = this.handleStateOnResponse.bind(this);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 9) {
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
            as="textarea"
            rows="15"
            placeholder="Write your code here"
            value={this.state.code}
            onChange={(e) => this.setState({ code: e.target.value })}
            onKeyDown={this.handleKeyDown}
          />
        </Form.Group>
        {this.state.isFetching ? (
          <div className="spinner-holder">
            <Spinner animation="border" />
          </div>
        ) : (
          <div>
            <Button
              variant="dark"
              onClick={this.handleOnClick}
              disabled={!this.state.code || this.state.isFetching}
            >
              Calculate!
            </Button>
          </div>
        )}
      </Form>
    );
  }

  calculationResult = () => {
    return (
      <div>
        {this.state.coord ? chart(this.state.coord) : null}
        {equation(
          this.state.exponential,
          this.state.polynomial,
          this.state.logarithm
        )}
      </div>
    );
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
            {this.state.isFetching ? null: this.calculationResult()}
          </Col>
        </Row>
      </Container >
    );
  };
}