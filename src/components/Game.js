import React, { useState, useCallback, useRef } from "react";
import { Grid } from "./Grid";

// game component for the game of life
export const Game = () => {
  const [running, setRunning] = useState(false);
  const [rows] = useState(10);
  const [columns] = useState(10);

  return (
    <div className="game">
      <button
        onClick={() => setRunning(!running)}
        style={{ width: "80px", height: "30px" }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <Grid rows={rows} columns={columns} running={running} />
    </div>
  );
};
