import React from "react";

export const Grid = ({ rows, columns }) => {
  // function to generate 2d array and fill it with zeros
  const generateGrid = (rows, columns) => {
    return Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(0));
  };

  // instatiate 2d array
  const grid = generateGrid(rows, columns);

  return (
    <div
      className="grid"
      // displaying 2d array as grid to get a board
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 25px)`
      }}
    >
      {/* rendering grid */}
      {grid.map(row =>
        row.map((element, index) => (
          <div
            key={index}
            className="element"
            style={{ border: "1px solid black", width: "25px", height: "25px" }}
          ></div>
        ))
      )}
    </div>
  );
};
