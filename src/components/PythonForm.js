import React, { useState } from "react";
import { Form, Input, Header, Button, FormControl } from "react-bootstrap";

export const PythonForm = ({ userId }) => {
  const [code, setCode] = useState("");

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
                setCode("");
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
    </div >
  );
};

