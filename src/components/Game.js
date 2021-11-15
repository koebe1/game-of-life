import React, { useState } from "react";
import { Grid } from "./Grid";

// game component for the game of life
export const Game = () => {
  const [rows] = useState(25);
  const [columns] = useState(25);



  return (
    // easy  way using grid
    <div className="game">
      <Grid rows={rows} columns={columns} />
    </div>
  );
};
