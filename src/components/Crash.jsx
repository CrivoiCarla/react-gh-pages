// // import React, { useState } from "react";
// // import "../css/Crash.css";

// // const Crash = () => {
// //   const [currentBet, setCurrentBet] = useState(0);
// //   const [gameState, setGameState] = useState("waiting"); // "waiting", "playing", "crashed"
// //   const [crashMultiplier, setCrashMultiplier] = useState(0);

// //   const handleBetChange = (event) => {
// //     setCurrentBet(parseInt(event.target.value));
// //   };

// //   const startGame = () => {
// //     setGameState("playing");
// //     const randomMultiplier = Math.floor(Math.random() * 500) / 100 + 1;
// //     setCrashMultiplier(randomMultiplier);
// //     setTimeout(() => {
// //       setGameState("crashed");
// //     }, 3000);
// //   };

// //   const resetGame = () => {
// //     setCurrentBet(0);
// //     setGameState("waiting");
// //     setCrashMultiplier(0);
// //   };

// //   return (
// //     <div className="crash-container">
// //       <h1 className="crash-title">Crash</h1>
// //       <div className="crash-info">
// //         <p>Current bet: {currentBet} bits</p>
// //         {gameState === "waiting" ? (
// //           <button className="crash-button" onClick={startGame}>
// //             Start game
// //           </button>
// //         ) : (
// //           <p>Game state: {gameState}</p>
// //         )}
// //         {gameState === "crashed" && (
// //           <div>
// //             <p>Crash multiplier: {crashMultiplier.toFixed(2)}</p>
// //             <p>Win: {currentBet * crashMultiplier} bits</p>
// //             <button className="crash-button" onClick={resetGame}>
// //               Play again
// //             </button>
// //           </div>
// //         )}
// //         {gameState === "playing" && (
// //           <div>
// //             <p>Multiplier: {crashMultiplier.toFixed(2)}</p>
// //             <button className="crash-button" onClick={() => setGameState("crashed")}>
// //               Cash out
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //       <div className="crash-bets">
// //         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 10)}>
// //           +10
// //         </button>
// //         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 100)}>
// //           +100
// //         </button>
// //         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 1000)}>
// //           +1000
// //         </button>
// //         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 10000)}>
// //           +10000
// //         </button>
// //         <button className="crash-bet" onClick={() => setCurrentBet(0)}>
// //           Clear
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Crash;
// import React, { useState, useEffect } from "react";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import "../css/Crash.css";

// const Rocket = ({ x, y }) => {
//   return (
//     <text x={x - 10} y={y - 10} fontSize="20">
//       🚀
//     </text>
//   );
// };

// const Crash = () => {
//   const [data, setData] = useState([]);
//   const [gameState, setGameState] = useState("waiting"); // "waiting", "playing", "crashed"
//   const [currentBet, setCurrentBet] = useState(0);
//   const [crashMultiplier, setCrashMultiplier] = useState(0);

//   useEffect(() => {
//     if (gameState === "playing") {
//       const interval = setInterval(() => {
//         setData((prevData) => {
//           const nextX = prevData.length + 1;
//           const nextY = nextX * 0.1;
//           return [...prevData, { x: nextX, y: nextY }];
//         });
//       }, 100);

//       return () => clearInterval(interval);
//     } else {
//       setData([]);
//     }
//   }, [gameState]);

//   const totalGameDuration = 7000; // Durata totală a jocului în milisecunde
//   const peakPercentage = 0.75; // Procentul pentru vârful graficului (3/4)
  
//   const startGame = () => {
//     setGameState("playing");
//     const randomMultiplier = Math.floor(Math.random() * 500) / 100 + 1;
//     setCrashMultiplier(randomMultiplier);
//     const peakTime = totalGameDuration * peakPercentage; // Timpul la care graficul ajunge la vârf
//     setTimeout(() => {
//       setGameState("crashed");
//     }, peakTime);
//   };
  

//   const resetGame = () => {
//     setCurrentBet(0);
//     setGameState("waiting");
//     setCrashMultiplier(0);
//   };

//   return (
//     <div className="crash-container">
//       <h1 className="crash-title">Crash</h1>
//       <div className="crash-info">
//         <p>Current bet: {currentBet} bits</p>
//         {gameState === "waiting" ? (
//           <button onClick={startGame}>Start game</button>
//         ) : (
//           <p>Game state: {gameState}</p>
//         )}

//         {gameState === "crashed" && (
//           <>
//             <p>Crash multiplier: {crashMultiplier.toFixed(2)}</p>
//             <p>Win: {currentBet * crashMultiplier} bits</p>
//             <button onClick={resetGame}>Play again</button>
//           </>
//         )}

//         {gameState === "playing" && (
//           <div>
//             <p>Multiplier: {data.length * 0.1}</p>
//             <button onClick={() => setGameState("crashed")}>Cash out</button>
//           </div>
//         )}
//       </div>
//       <div className="chart-container">
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//         <defs>
//           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//             <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//           </linearGradient>
//         </defs>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="x" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
//         {data.length > 0 && (
//           <Rocket x={data[data.length - 1].x} y={data[data.length - 1].y} />
//         )}
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
      

//       <div className="crash-bets">
//         <button onClick={() => setCurrentBet(currentBet + 10)}>+10</button>
//         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 100)}>
//           +100
//         </button>
//         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 1000)}>
//           +1000
//         </button>
//         <button className="crash-bet" onClick={() => setCurrentBet(currentBet + 10000)}>
//           +10000
//         </button>
//         <button className="crash-bet" onClick={() => setCurrentBet(0)}>
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Crash;

