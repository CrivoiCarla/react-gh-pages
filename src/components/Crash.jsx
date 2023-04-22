import React, { useState } from "react";
import "../css/Crash.css";

const Crash = () => {
  const [currentBet, setCurrentBet] = useState(0);
  const [gameState, setGameState] = useState("waiting"); // "waiting", "playing", "crashed"
  const [crashMultiplier, setCrashMultiplier] = useState(0);

  const handleBetChange = (event) => {
    setCurrentBet(parseInt(event.target.value));
  };

  const startGame = () => {
    setGameState("playing");
    const randomMultiplier = Math.floor(Math.random() * 500) / 100 + 1;
    setCrashMultiplier(randomMultiplier);
    setTimeout(() => {
      setGameState("crashed");
    }, 3000);
  };

  const resetGame = () => {
    setCurrentBet(0);
    setGameState("waiting");
    setCrashMultiplier(0);
  };

  return (
    <div className="crash-container">
      <h1 className="crash-title">Crash</h1>
      <div className="crash-info">
        <p>Current bet: {currentBet} bits</p>
        {gameState === "waiting" ? (
          <button className="crash-button" onClick={startGame}>
            Start game
          </button>
        ) : (
          <p>Game state: {gameState}</p>
        )}
        {gameState === "crashed" && (
          <div>
            <p>Crash multiplier: {crashMultiplier.toFixed(2)}</p>
            <p>Win: {currentBet * crashMultiplier} bits</p>
            <button className="crash-button" onClick={resetGame}>
              Play again
            </button>
          </div>
        )}
        {gameState === "playing" && (
          <div>
            <p>Multiplier: {crashMultiplier.toFixed(2)}</p>
            <button className="crash-button" onClick={() => setGameState("crashed")}>
              Cash out
            </button>
          </div>
        )}
      </div>
      <div className="crash-bets">
        <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 10)}>
          +10
        </button>
        <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 100)}>
          +100
        </button>
        <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 1000)}>
          +1000
        </button>
        <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 10000)}>
          +10000
        </button>
        <button className="crash-bet" onClick={() => setCurrentBet(0)}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Crash;
