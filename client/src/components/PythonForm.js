import React, { useState } from "react";
import { Form, Row, Col, Button, FormControl, Container } from "react-bootstrap";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";

export const PythonForm = ({ userId }) => {
  const [code, setCode] = useState("");
  const [coord, setCoord] = useState(null);

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
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={async () => {
                const post = { code };
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
                    setCoord(JSON.parse(text).coord);
                  });
              }}
            >
              Submit
          </Button>
          </Form>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <VictoryChart style={{ parent: { maxWidth: "100%" } }} polar={false} height={400} width={400}>
            <VictoryLine
              interpolation="natural" data={coord}
              style={{ data: { stroke: "#c43a31" } }}
            />
            <VictoryScatter data={coord}
              size={3}
              style={{ data: { fill: "#c43a31" } }}
            />
          </VictoryChart>

        </Col>
      </Row>
    </Container >
  );
};

