import React from "react";
import { Form, Row, Col, Button, Spinner, Container } from "react-bootstrap";
import { chart } from './Chart.js';
import { equation } from './Equation.js';
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
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleStateOnResponse = this.handleStateOnResponse.bind(this);
  }

  handleKeyDown = (event) => {
    /*if (event.keyCode === 9) {
      event.preventDefault();

      var val = this.state.code,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;
      event.target.selectionEnd = end;
      console.log(start);
      console.log(end);
      this.refs.input.selectionEnd = start + 1;
      this.setState(
        {
          "code": val.substring(0, start) + '  ' + val.substring(end)
        }
      )
    }*/
    // 'event.key' will return the key as a string: 'Tab'
    // 'event.keyCode' will return the key code as a number: Tab = '9'
    // You can use either of them
    if (event.keyCode === 9) {
      // Prevent the default action to not lose focus when tab
      event.preventDefault();

      // Get the cursor position
      const { selectionStart, selectionEnd } = event.target;
      console.log(selectionStart);
      console.log(selectionEnd);
      // update the state
      this.setState(
        (prevState) => ({
          code:
            prevState.code.substring(0, selectionStart) +
            "  " + // '\t' = tab, size can be change by CSS
            prevState.code.substring(selectionEnd),
        }),
        // update the cursor position after the state is updated
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

  handleOnClick = async () => {
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


  codeForm = () => {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <h6>
            Write down your algorithm in the box provided and predict its time
            complexity.
          </h6>
          Rules:
          <ul>
            <li>The algorithm should be written in Python </li>
            <li>
              The algorithm should be written in the form of <pre>def f(n)</pre>
              , where n represents the input size to the algorithm.
            </li>
          </ul>
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
