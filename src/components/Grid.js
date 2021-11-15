import React, { useState } from "react";
import produce from "immer";

export const Grid = ({ rows, columns }) => {
  // using initalizer function so grid only gets created on the initial render
  const [grid, setGrid] = useState(() => {
    // return a 2d array and will it with zeros
    return Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(0));
  });
  console.log("rendered");
  return (
    <div
      // displaying 2d array as grid to get a board
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 25px)`
      }}
    >
      {/* rendering grid */}
      {grid.map((row, x) =>
        row.map((element, y) => (
          <div
            key={`${x}-${y}`}
            onClick={() => {
              // produce function lets you change the state
              const newGrid = produce(grid, gridCopy => {
                // change the value based on the current value
                gridCopy[x][y] === 1
                  ? (gridCopy[x][y] = 0)
                  : (gridCopy[x][y] = 1);
              });
              // set grid to the new copy
              setGrid(newGrid);
            }}
            style={{
              // conditional render background color depending on the state of the element
              background: grid[x][y] === 1 ? "#fcd252" : "white",
              cursor: "pointer",
              border: "1px solid black",
              width: "25px",
              height: "25px"
            }}
          ></div>
        ))
      )}
    </div>
  );
};
