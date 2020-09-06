import React from "react";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";

export function chart(coord) {
  return (
    <VictoryChart style={{
      parent: {
        maxWidth: "50%", margin: "auto"
      }
    }} polar={false} height={400} width={400}>
      <VictoryLine
        interpolation="natural" data={coord}
        style={{ data: { stroke: "#c43a31" } }}
      />
      <VictoryScatter data={coord}
        size={3}
        style={{ data: { fill: "#c43a31" } }}
      />
    </VictoryChart>
  )
}