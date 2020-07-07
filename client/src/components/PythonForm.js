import React, { useState } from "react";
import { Form, Row, Col, Button, FormControl, Container } from "react-bootstrap";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";


export class PythonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { code: "", coord: null };
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6}>
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
                onClick={async () => {
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
                    .then(function (text) {
                      this.setState({ code: JSON.parse(text).coord });
                    });
                }}
              >
                Calculate!
          </Button>
            </Form>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <VictoryChart style={{ parent: { maxWidth: "100%" } }} polar={false} height={400} width={400}>
              <VictoryLine
                interpolation="natural" data={this.state.coord}
                style={{ data: { stroke: "#c43a31" } }}
              />
              <VictoryScatter data={this.state.coord}
                size={3}
                style={{ data: { fill: "#c43a31" } }}
              />
            </VictoryChart>

          </Col>
        </Row>
      </Container >
    );
  };
}
