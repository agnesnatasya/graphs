import React, { useState } from "react";
import { Form, Input, Header, Button, FormControl } from "react-bootstrap";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";
export const PythonForm = ({ userId }) => {
  const [code, setCode] = useState("");
  const data = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
    { x: 5, y: 5 }
  ];

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
                console.log(text);
              });
            /*
              {
            console.log(response.text().result)
                  setTitle("");
                  setBody("");
                });
              if (response.ok) {
            console.log("adads");
                console.log(response.text());
              }*/
          }}
        >
          Submit
          </Button>
      </Form>
      <VictoryChart polar={false} height={390}>
        <VictoryLine
          interpolation="linear" data={data}
          style={{ data: { stroke: "#c43a31" } }}
        />
        <VictoryScatter data={data}
          size={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>

    </div >
  );
};

