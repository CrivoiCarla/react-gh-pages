import React,{ useState } from "react";
import "../css/Roulette.css";
import { Wheel } from 'react-custom-roulette'

const options = [
  { option: "10x", style: { backgroundColor: "#f44336", textColor: "#fff" } },
  { option: "Nu ai castigat", style: { backgroundColor: "#e91e63", textColor: "#fff" } },
  { option: "2x", style: { backgroundColor: "#9c27b0", textColor: "#fff" } },
  { option: "Nu ai castigat", style: { backgroundColor: "#673ab7", textColor: "#fff" } },
  { option: "1x", style: { backgroundColor: "#2196f3", textColor: "#fff" } },
  { option: "Nu ai castigat", style: { backgroundColor: "#ff9800", textColor: "#fff" } },
  { option: "15x", style: { backgroundColor: "#009688", textColor: "#fff" } },
    { option: "Nu ai castigat", style: { backgroundColor: "#795548", textColor: "#fff" } },
];

function RoulettePage() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <>
      <div class='roulette'>
      <Wheel 
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={options}

        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      </div>
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
}

export default RoulettePage;
