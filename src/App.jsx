import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("white"))); 
  const [clickOrder, setClickOrder] = useState([]); 
  const [clickCount, setClickCount] = useState(0); 

  const handleClick = (row, col) => {
    // Prevent re-clicking the same box
    if (matrix[row][col] !== "white") return; 

    // Change the clicked box to green
    const updatedMatrix = matrix.map((r, i) =>
      r.map((box, j) => (i === row && j === col ? "green" : box))
    );
    setMatrix(updatedMatrix);

    // Update click order and count
    setClickOrder((prev) => [...prev, { row, col }]);
    setClickCount((prev) => prev + 1);

    // Handle the last click to change all to orange
    if (clickCount === 8) {
      setTimeout(() => {
        changeToOrange();
      }, 500);
    }
  };

  const changeToOrange = () => {
    clickOrder.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, i) =>
            r.map((box, j) => (i === row && j === col ? "orange" : box))
          )
        );
      }, index * 500); 
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((boxColor, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="box"
              style={{ backgroundColor: boxColor }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
