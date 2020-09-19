import React from "react";
import { Form, Row, Col, Button, Spinner, Container } from "react-bootstrap";
import { chart } from './Chart.js';
import { equation } from './Equation.js';
import { Explanation } from './Explanation.js';
import "./CodeForm.css";

export class CodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        code: "",
        coord: null,
        exponential: 0,
        polynomial: 0,
        logarithm: 0,
        isFetching: false
    };
    this.textAreaRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnClickCalculate = this.handleOnClickCalculate.bind(this);
    this.handleStateOnResponse = this.handleStateOnResponse.bind(this);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 9) {
      event.preventDefault();

      const { selectionStart, selectionEnd } = event.target;
      console.log(selectionStart);
      console.log(selectionEnd);
      this.setState(
        (prevState) => ({
          code:
            prevState.code.substring(0, selectionStart) +
            "  " +
            prevState.code.substring(selectionEnd),
        }),
        () => {
          this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd =
            selectionStart + 2;
        }
      );
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

  handleOnClickCalculate = async () => {
    this.setState({ isFetching: true })
    const post = { code: this.state.code };
      const response = await fetch(
         "https://okpl2px1ub.execute-api.us-east-1.amazonaws.com/prod/time-complexity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      )
        .then(function (response) {
          return response.text();
        })
        .then(this.handleStateOnResponse);
  }

  handleOnClickExampleMultipleInputs = () => {
    this.setState({
      code: `def f(x):
  def g(x, n):
    for i in range(x):
      if i == n:
        print(i)
  g(x, x+1)
    `
    })
  }

  exampleCodeChoices = () => {
    return (
      <div>
        <Row>
          <Col lg>
            <Button className="btn-example-code" onClick={this.handleOnClickExampleMultipleInputs}>
              Sample function with multiple inputs
            </Button>
          </Col>
          <Col lg>
            <Button className="btn-example-code" onClick={this.handleOnClickExampleListInput}>
              Sample function with list input
            </Button>
          </Col>
          <Col lg>
            <Button className="btn-example-code" onClick={this.handleOnClickExampleOtherInput}>
              Sample function with list and other input
            </Button>
          </Col>
        </Row>
      </div>
    );
  }


  codeForm = () => {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Explanation />
          {this.exampleCodeChoices()}
          <Form.Control
            ref={this.textAreaRef}
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
              className="btn-calculate"
              onClick={this.handleOnClickCalculate}
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
