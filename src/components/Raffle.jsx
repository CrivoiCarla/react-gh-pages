import React, { useState } from "react";
import "../css/Lottery.css";

function Lottery() {
  const [winner, setWinner] = useState(null);

  const handleButtonClick = () => {
    // Generare număr câștigător între 1 și 6
    const winningNumber = Math.floor(Math.random() * 6) + 1;
    setWinner(winningNumber);
  };

  return (
    <div className="lottery">
      <div className="number-container">
        {winner ? (
          <h2 className="winning-number">{winner}</h2>
        ) : (
          <h2 className="winning-number">?</h2>
        )}
      </div>
      <div className="button-container">
        <button className="lottery-button" onClick={handleButtonClick}>
          1
        </button>
        <button className="lottery-button" onClick={handleButtonClick}>
          2
        </button>
        <button className="lottery-button" onClick={handleButtonClick}>
          3
        </button>
        <button className="lottery-button" onClick={handleButtonClick}>
          4
        </button>
        <button className="lottery-button" onClick={handleButtonClick}>
          5
        </button>
        <button className="lottery-button" onClick={handleButtonClick}>
          6
        </button>
      </div>
    </div>
  );
}

export default Lottery;
