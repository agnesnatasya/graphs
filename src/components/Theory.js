import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./Theory.css";

export function Theory() {
  return (
    <Container>
      <Row>
        <Col>
          <h6>
            The result given in the visualizer is the best prediction of the
            upper bound time complexity of the algorithm given. What is upper
            bound time complexity?
          </h6>
          The time complexity is the growth of time consumed by the algorithm as
          the input size grows.
          <br />
          <br />
          <h6>
            What is input size? <br />
          </h6>
          Input size is, informally, the variable which affects the number of
          times the code is run. For example, look at this piece of code
          <br />
          <code>
            def f(x, n):
            <br />
            &nbsp;&nbsp;for i in range(n):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if i == x:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(i)
          </code>
          <br />
          <p>
            The input size is the <var>n</var> variable and not the <var>x</var>{" "}
            variable. This is because, as the variable <var>n</var> varies, the
            number of times the code run differs.<br></br>
          </p>
          <p>
            Time complexity of an algorithm is different with the running time
            of an algorithm. The running time of the algorithm is the literal
            time consumed by the algorithm, but this depends on the computer
            that is running it, thus it does not give a very best measure of an
            algorithm. Time complexity, however, is manually analysed for each
            algorithm, according to the definition above.
          </p>
          <p>
            There are three kinds of analyses:
            <ul>
              <li>
                Worst-case analysis, analysis according to the maximum time that
                can be consumed by the algorithm with input size n.
              </li>
              <li>
                Average-case analysis, analysis according to the average time
                that can be consumed by the algorithm with input size n.
              </li>
              <li>
                Best-case analysis, analysis according to the average time
                that can be consumed by the algorithm with input size n.
              </li>
            </ul>
          </p>

          <p>
            We usually are interested in finding worst-case analysis, average-case analysis are useful in randomisation algorithms,
             but best-case analysis is not really useful in most cases.
            
            
          </p>
        </Col>
      </Row>
    </Container>
  );
}
