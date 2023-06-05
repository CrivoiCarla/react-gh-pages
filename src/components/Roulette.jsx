import React, { useState, useEffect } from "react";
import "../css/Roulette.css";
import { Wheel } from "react-custom-roulette";

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

  
  const fetchPrizeNumber = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    const requestOptions = {
      method: "POST",
      headers: {
        'Origin': "https://pacanele.herokuapp.com",
      },
    };

    try {
      const response = await fetch(
        "https://pacanelephp.herokuapp.com/v1/spin",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      
      const parsedData = JSON.parse(result); // Parse the response text as JSON
      const number = parsedData.number;
      
      return number;
    } catch (error) {
      console.log("error", error);
      return 0;
    }
  };




  const handleSpinClick = async () => {
    if (!mustSpin) {
      const newPrizeNumber = await fetchPrizeNumber();
      console.log(newPrizeNumber)
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };



  return (
    <>
      <div className="roulette">
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