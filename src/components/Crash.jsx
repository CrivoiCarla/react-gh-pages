import React, { useEffect, useRef, useState } from 'react';
import '../css/Crash.css';
import rocketImage from '../image/rocket.png';
import { useNavigate  } from "react-router-dom";

export const Crash = () => {

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

    const token = getToken();
    const navigate = useNavigate();
    
    const sceneRef = useRef();
    const [betAmount, setBetAmount] = useState("");
    const [gameId, setGameId] = useState(null);
    const [multiplier, setMultiplier] = useState(1);
    const [countdown, setCountdown] = useState(5.00);
    const [gameState, setGameState] = useState("PREPARING");
    const [buttonLabel, setButtonLabel] = useState("Place Bet");
    const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        //DE AICI IEI DATELE DESPRE PARTICIPANT/ BANI SI ID ETC

      //   setId(userData.id)
      //   setName(userData.name);
      //   setAge(userData.age);
      //   setBalance(userData.account_profile.money);
      //   setPassword(userData.password);
      //   setUserDataLoaded(true);
      //   setPhoto(userData.account_profile.photo);
      } else {
        navigate('/login') // Redirecționează către pagina de login
      }
    }, []);    

    useEffect(() => {
      if (gameState === "FINISHED") {
        // Remove all stars
        document.querySelectorAll('.star').forEach((star) => star.remove());
  
        // Start a new round after some delay
        setTimeout(() => {
          setGameState("PREPARING");
          setCountdown(5.00);
          setCurrentMultiplier(1.00);
          getGameId();
        }, 3000);
      }
    }, [gameState]);
  
    const getGameId = () => {
      const getIdRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) 
      };
  
      fetch('https://pacanelephp.herokuapp.com/v1/getCrashId', getIdRequestOptions)
          .then(response => response.json())
          .then(data => {
              setGameId(data.id);
          })
          .catch(error => console.error('A apărut o eroare la obținerea ID-ului jocului:', error));
    };
  
    // Add this to the star creation loop to add a class to each star for removal
    // star.classList.add('star');



    useEffect(() => {
      // Countdown logic
      const countdownTimer = setInterval(() => {
          if (countdown <= 0) {
              setGameState("RUNNING");
              setButtonLabel("Cashout");
              getMultiplier();
              clearInterval(countdownTimer);
          } else {
              setCountdown(prevCountdown => (prevCountdown - 0.01).toFixed(2));
          }
      }, 1); // 100ms to update 0.01s 

      // Cleanup
      return () => clearInterval(countdownTimer);
  }, [countdown]); // dependency on countdown

  const getMultiplier = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) 
    };

    fetch('https://pacanelephp.herokuapp.com/v1/getMultiplierCrash', requestOptions)
        .then(response => response.json())
        .then(data => {
          setMultiplier(Number(data.multiplier));
          
        })
        .catch(error => console.error('A apărut o eroare la obținerea multiplicatorului:', error));
  }

  useEffect(() => {
    if (gameState === "RUNNING") {
        let increment = 0.01;
        const multiplierTimer = setInterval(() => {
            if (currentMultiplier >= multiplier) {
                clearInterval(multiplierTimer);
                setGameState("FINISHED");
                setGameEnded(true);
                setButtonLabel("Place Bet");
                setTimeout(() => {
                    setGameEnded(false);
                    setGameState("PREPARING");
                    setCountdown(5.00);
                    setCurrentMultiplier(1.00);
                }, 3000); // Wait for 2 seconds before resetting
            } else {
                setCurrentMultiplier(prevMultiplier => (Number(prevMultiplier) + increment).toFixed(2));
                increment *= 1.15; // increase the increment slightly each time
            }
        }, 100); // 100ms to update 0.01

        // Cleanup
        return () => clearInterval(multiplierTimer);
    }
}, [gameState, currentMultiplier, multiplier]);  // dependency on gameState and currentMultiplier



  

    useEffect(() => {
        const rocket = document.querySelector('.rocket');

        const handleMouseMove = (e) => {
            const rect = sceneRef.current.getBoundingClientRect();
            rocket.style.left = e.clientX - rect.left + 'px';
            rocket.style.top = e.clientY - rect.top + 'px';
        };

        if(sceneRef.current) {
            sceneRef.current.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if(sceneRef.current) {
                sceneRef.current.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    useEffect(() => {
      if (gameState === "RUNNING"){
          let count = 40;
          let i = 0;
          while(i < count){
              let star = document.createElement('i');
              let x = Math.floor(Math.random() * window.innerWidth);
              let duration = Math.random() * 1;
              let h = Math.random() * 100;

              star.style.left = x + 'px';
              star.style.width = 1 + 'px';
              star.style.height = 50 + h + 'px';
              star.style.animationDuration = duration + 's';

              star.classList.add('star');
              sceneRef.current.appendChild(star);
              i++;
          }
      }
    }, [gameState]);

    const handlePlaceBet = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_jucator: 66, suma: betAmount }) 
      };

      fetch('https://pacanelephp.herokuapp.com/v1/placeBet', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('A apărut o eroare la plasarea pariului:', error));
    };


    

    const cashout = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_jucator: 66, multiplier }) 
      };

      fetch('https://pacanelephp.herokuapp.com/v1/cashout', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('A apărut o eroare la trimiterea datelor cashout:', error));
    };

    //console.log(token)
    if (token=='undefined') {
      navigate("/login"); // Redirecționează către pagina de login
      return null; // Sau o componentă de încărcare
    }

    return (
      <div className="App">
        <div className="container userSelectNone">
          <div className="scene" ref={sceneRef}>
            <div className="rocket">
              <img src={rocketImage} alt="Rocket"/>
            </div>
            <div className={`countdown ${gameEnded ? 'ended' : ''} noHover`}>
                {gameState === "PREPARING" && <>
                  <h1>Preparing Round</h1>
                  <h2>Starts in: {countdown}</h2>
                </>}
                {(gameState === "RUNNING" || gameEnded) && <h1>Multiplier: {currentMultiplier}x</h1>}
            </div>
          </div>
          <div className="bet-container ">
            <label htmlFor="bet-amount">Bet amount</label>
            <input 
                type="text" 
                id="bet-amount" 
                value={betAmount} 
                onChange={e => setBetAmount(e.target.value)}
            />
            <button onClick={buttonLabel === "Place Bet" ? handlePlaceBet : cashout}>{buttonLabel}</button>
          </div>
        </div>
      </div>
    )
}

export default Crash;
