import React,{ useState } from "react";
import "../css/Roulette.css";
import { Wheel } from 'react-custom-roulette'

const options = [
  { option: "10$", style: { backgroundColor: "#FF0000", textColor: "#fff" } },
  { option: "Lose", style: { backgroundColor: "#000000", textColor: "#fff" } },
  { option: "2$", style: { backgroundColor: "#FF0000", textColor: "#fff" } },
  { option: "40$", style: { backgroundColor: "#000000", textColor: "#fff" } },
  { option: "10$", style: { backgroundColor: "#FF0000", textColor: "#fff" } },
  { option: "100$", style: { backgroundColor: "#000000", textColor: "#fff" } },
  { option: "20$", style: { backgroundColor: "#FF0000", textColor: "#fff" } },
  { option: "Lose", style: { backgroundColor: "#000000", textColor: "#fff" } },
  { option: "100$", style: { backgroundColor: "#FF0000", textColor: "#fff" } },
  { option: "1000$", style: { backgroundColor: "#008000", textColor: "#fff" } },
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
