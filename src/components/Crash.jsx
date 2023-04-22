import React, { useState } from "react";
// import "./Crash.css";

const Crash = () => {
  const [bet, setBet] = useState(0);

  const handleBetChange = (event) => {
    setBet(event.target.value);
  };

  const placeBet = () => {
    console.log(`Placed bet: ${bet}`);
  };

  return (
    <div className="crash-container">
      <div className="multiplier-graph"></div>
      <div className="bet-section">
        <h3>Place your bet</h3>
        <input type="number" min="0" max="10000" value={bet} onChange={handleBetChange} />
        <button onClick={placeBet}>Place Bet</button>
      </div>
    </div>
  );
};

export default Crash;
