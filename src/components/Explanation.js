import React from "react";
import "./Explanation.css";

export function Explanation() {
  return (
    <div>
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
    </div>
  );
}
