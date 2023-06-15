import React, { useState, useEffect } from "react";
import "../css/Roulette.css";
import Footer from './Footer';
import { Wheel } from "react-custom-roulette";
import { useNavigate  } from "react-router-dom";

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


// Funcția pentru a seta tokenul în stocarea sesiunii
function setToken(userToken) {
  sessionStorage.setItem('userData', JSON.stringify(userToken));
}

// Funcția pentru a obține tokenul din stocarea sesiunii
function getToken() {
  const tokenString = sessionStorage.getItem('userData');
  const userToken = JSON.parse(tokenString);
  return userToken?.id;
}


function RoulettePage() {

  // // NAVBAR_____________________________________________________________________

  const buttons = document.querySelectorAll(".menu__item");
  let activeButton = document.querySelector(".menu__item.active");

  buttons.forEach((item) => {
  const text = item.querySelector(".menu__text");
  setLineWidth(text, item);

  window.addEventListener("resize", () => {
      setLineWidth(text, item);
  });

  item.addEventListener("click", function () {
      if (this.classList.contains("active")) return;

      this.classList.add("active");

      if (activeButton) {
      activeButton.classList.remove("active");
      activeButton.querySelector(".menu__text").classList.remove("active");
      }

      handleTransition(this, text);
      activeButton = this;
  });
  });

  function setLineWidth(text, item) {
  const lineWidth = text.offsetWidth + "px";
  item.style.setProperty("--lineWidth", lineWidth);
  }

  function handleTransition(item, text) {
  item.addEventListener("transitionend", (e) => {
      if (e.propertyName != "flex-grow" || !item.classList.contains("active"))
      return;

      text.classList.add("active");
  });
  }

// // FINAL NAVBAR_______________________________________________________________


  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [id, setId] = useState(-1);
  const [balance, setBalance] = useState(0);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      setId(userData.id);
      setBalance(userData.account_profile.money);

    } else {
      navigate('/login') // Redirecționează către pagina de login
    }
  }, []);

  // Verificarea tokenului și redirecționarea către pagina de login dacă tokenul lipsește
  if (!token) {
    navigate("/login"); // Redirecționează către pagina de login
    return null; // Sau o componentă de încărcare
  }
  
  const fetchPrizeNumber = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    const requestOptions = {
      method: "POST",
      headers: {
        'Origin': "https://pacanele.herokuapp.com",
      },
      body: JSON.stringify({ id: id })
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
      //console.log(newPrizeNumber)
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData);
      //console.log( (parseFloat(userData.account_profile.money)  + parseInt(options[0]['option'])).toString())
      if(newPrizeNumber != '1' && newPrizeNumber!='7' )
      {
        userData.account_profile.money = (parseFloat(userData.account_profile.money)  + parseInt(options[0]['option'])).toString() ;
        console.log(userData.account_profile.money)
        localStorage.setItem('userData', JSON.stringify(userData));
      }
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };



  return (
    <>
      <div className="uniqueRoulette">
      <div className="wheel-container">
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
    </div>
      <Footer />
    </>
  );
}

export default RoulettePage;