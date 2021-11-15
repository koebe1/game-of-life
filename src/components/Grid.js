import React, { useState, useRef, useCallback } from "react";
import produce from "immer";

export const Grid = ({ rows, columns, running }) => {
  // using initalizer function so grid only gets created on the initial render
  const [grid, setGrid] = useState(() => {
    // return a 2d array and will it with zeros
    return Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(0));
  });

  // use useRef to get the updated value of running in the run function
  const runningRef = useRef(running);
  runningRef.current = running;

  // list of operations to use for the "neighbour checking" when running the game
  const operations = [
    // [x-1][y-1]  [x-1][y]  [x-1][y+1]
    // [x][y-1]    [x][y]    [x][y+1]
    // [x+1][y-1]  [x+1][y]  [x+1][y+1]

    // first row
    [-1, -1],
    [-1, 0],
    [-1, 1],
    // second row
    [0, -1],
    [0, 1],
    // third row
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  // run function implements simulation logic for conway's game of life
  // use useCallback to don't unnecessarily recreate function
  const run = useCallback(() => {
    // runningRef.current is always going to be up to date even the function only is called once
    if (!runningRef.current) {
      return;
    }

    // set grid to value of the procuce function -> the new grid
    setGrid(currentGrid => {
      return produce(currentGrid, gridCopy => {
        // looping through every value in the grid
        for (let x = 0; x < rows; x++) {
          for (let y = 0; y < columns; y++) {
            // rules:
            // live cells:
            // 1. neighbours < 2 -> cell dies
            // 2. neighbours 2 || 3 -> cell lives to next iteration
            // 3. neighbours > 3 -> cell dies
            // dead cells:
            // 1. neighbours === 3 -> cell becomes alive

            // what are the fields of the neighbours?
            // cell grid[x][y]

            // use operations array for simple logic
            let neighbours = 0;
            operations.forEach(([i, j]) => {
              const newX = x + i;
              const newY = y + j;
              // check if we go out of the grid
              if (newX >= 0 && newY >= 0 && newX < rows && newY < columns) {
                // check if neighbour is alive
                neighbours += currentGrid[newX][newY];
              }
            });

            // conditions when cell dies
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[x][y] = 0;
            } else if (currentGrid[x][y] === 0 && neighbours === 3) {
              gridCopy[x][y] = 1;
            }
          }
        }
      });
      // run game of life every second
      setTimeout(run, 1000);
    });
  }, []);

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
                gridCopy[x][y] = gridCopy[x][y] ? 0 : 1;
              });
              // set grid to the new copy
              setGrid(newGrid);
            }}
            style={{
              // conditional render background color depending on the state of the element
              background: grid[x][y] === 1 ? "#fcd252" : null,
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
