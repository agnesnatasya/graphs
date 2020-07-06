import React, { useState } from "react";
import { Form, Input, Header, Button, FormControl } from "react-bootstrap";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";
export const PythonForm = ({ userId }) => {
  const [code, setCode] = useState("");
  const [coord, setCoord] = useState(null);

  return (
    < div >

      <h1>Write your code!</h1>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Code</Form.Label>
          {' '}

          <Form.Control
            as="textarea" rows="15"
            placeholder="Put your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={async () => {
            const post = { code };
            const response = await fetch("/submit", {
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
              .then(function (text) {
                setCoord(JSON.parse(text).coord);
              });
          }}
        >
          Submit
          </Button>
      </Form>
      <VictoryChart polar={false} height={390}>
        <VictoryLine
          interpolation="linear" data={coord}
          style={{ data: { stroke: "#c43a31" } }}
        />
        <VictoryScatter data={coord}
          size={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>

    </div >
  );
};

