import React, { useEffect, useRef, useState } from 'react';
import '../css/Crash.css';
import rocketImage from '../image/rocket.png';
import rocketImage2 from '../image/200 (2).gif';
import rocketImage3 from '../image/200 (3).gif';
import rocketImage4 from '../image/200 (4).gif';
import rocketCrash from '../image/200.gif';
import rocketCrash2 from '../image/200 (1).gif';
import rocketCrash3 from '../image/200 (5).gif';
import rocketCrash4 from '../image/200 (6).gif';

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
    const [id_j, setId] = useState(null);
    const [ball, setBalance] = useState(null);
    const [betButtonDisabled, setBetButtonDisabled] = useState(false);
    const [valBeti, setVlabetI] = useState(null);

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
    // getGameId();
    // useEffect(() => {
    //   getGameId();
      
    // }, []);
    useEffect(() => {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        //DE AICI IEI DATELE DESPRE PARTICIPANT/ BANI SI ID ETC

        setId(userData.id)
      //   setName(userData.name);
      //   setAge(userData.age);
        setBalance(userData.account_profile.money);
      //   setPassword(userData.password);
        // setUserDataLoaded(true);
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
          
          setBetButtonDisabled(false);
        }, 3000);
      }
    }, [gameState]);
  
    // const getGameId = () => {
    //   const getIdRequestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({}) 
    //   };
  
    //   fetch('https://pacanelephp.herokuapp.com/v1/getCrashId', getIdRequestOptions)
    //       .then(response => response.json())
    //       .then(data => {
    //           setGameId(data.id);
    //       })
    //       .catch(error => console.error('A apărut o eroare la obținerea ID-ului jocului:', error));
    // };
  
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
              setBetButtonDisabled(false);
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
        // setBetButtonDisabled(false);
        const multiplierTimer = setInterval(() => {
            if (currentMultiplier >= multiplier) {
              // // _________________UPDATE LOCAL STORAGE
              // const storedData = localStorage.getItem("userData");
              // const userData = JSON.parse(storedData);
              // userData.account_profile.money = (parseFloat(userData.account_profile.money)  + parseInt(1000)).toString() ;
              // localStorage.setItem('userData', JSON.stringify(userData));

              // // _________________FINAL LOCAL STOARAGE

                clearInterval(multiplierTimer);
                setGameState("FINISHED");
                setGameEnded(true);
                setButtonLabel("Place Bet");
                setBetButtonDisabled(true);
                getGameId();
                setTimeout(() => {
                    setGameEnded(false);
                    setGameState("PREPARING");
                    setCountdown(5.00);
                    setBetButtonDisabled(false);
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



  

   

  //   useEffect(() => {
  //     const rocket = document.querySelector('.rocket');
  
  //     let vx = (Math.random() - 0.5) * 20; // viteza pe axa x
  //     let vy = (Math.random() - 0.5) * 20; // viteza pe axa y
  
  //     const sceneWidth = sceneRef.current.offsetWidth; // lățimea scenei
  //     const sceneHeight = sceneRef.current.offsetHeight; // înălțimea scenei
  
  //     const moveRocket = () => {
  //         // modifică viteza la fiecare actualizare pentru a face mișcarea mai aleatorie
  //         vx += (Math.random() - 0.5) * 2;
  //         vy += (Math.random() - 0.5) * 2;
  
  //         const x = rocket.offsetLeft + vx;
  //         const y = rocket.offsetTop + vy;
  
  //         // Asigură-te că racheta nu iese din scenă
  //         if (x < 0 || x > sceneWidth - rocket.offsetWidth) {
  //             vx = -vx; // inversarea direcției de deplasare pe axa x
  //         }
  //         if (y < 0 || y > sceneHeight - rocket.offsetHeight) {
  //             vy = -vy; // inversarea direcției de deplasare pe axa y
  //         }
  
  //         rocket.style.left = (rocket.offsetLeft + vx) + 'px';
  //         rocket.style.top = (rocket.offsetTop + vy) + 'px';
  //     };
  
  //     const timerId = setInterval(moveRocket, 20); // intervalul de timp mai mic face mișcarea mai lină
  
  //     return () => {
  //         clearInterval(timerId); // oprirea timerului atunci când componenta este demontată
  //     };
  // }, []);
  
  useEffect(() => {
    const rocket = document.querySelector('.rocket');

    // URL-ul gif-ului
    const gifURL = rocketCrash;
    // Salvarea URL-ului inițial al rachetei
    const initialRocketURL = rocketImage;

    let vx = (Math.random() - 0.5) * 20; // viteza pe axa x
    let vy = (Math.random() - 0.5) * 20; // viteza pe axa y

    const sceneWidth = sceneRef.current.offsetWidth; // lățimea scenei
    const sceneHeight = sceneRef.current.offsetHeight; // înălțimea scenei

    const moveRocket = () => {
        if (gameState !== "RUNNING") {
            return;
        }

        vx += (Math.random() - 0.5) * 2;
        vy += (Math.random() - 0.5) * 2;

        const x = rocket.offsetLeft + vx;
        const y = rocket.offsetTop + vy;

        if (x < 0 || x > sceneWidth - rocket.offsetWidth) {
            vx = -vx;
        }
        if (y < 0 || y > sceneHeight - rocket.offsetHeight) {
            vy = -vy;
        }

        rocket.style.left = (rocket.offsetLeft + vx) + 'px';
        rocket.style.top = (rocket.offsetTop + vy) + 'px';
    };

    const timerId = setInterval(moveRocket, 20);

    return () => {
        clearInterval(timerId);
    };
}, [gameState]);  // adăugați gameState ca dependență

useEffect(() => {
  const rocket = document.querySelector('.rocket');
  const rocketImg = rocket.querySelector('img');
  if (gameState === "FINISHED") {
      rocket.classList.remove('fire');
      let randomValue = Math.floor(Math.random() * 4);
      switch(randomValue) {
          case 0:
              rocketImg.src = rocketCrash;
              break;
          case 1:
              rocketImg.src = rocketCrash2;
              break;
          case 2:
              rocketImg.src = rocketCrash3;
              break;
          case 3:
              rocketImg.src = rocketCrash4;
              break;
      }
  } else if (gameState === "PREPARING") {
      let randomValue = Math.floor(Math.random() * 4);
      switch(randomValue) {
          case 0:
              rocketImg.src = rocketImage;
              rocket.classList.add('fire');
              break;
          case 1:
              rocketImg.src = rocketImage2;
              break;
          case 2:
              rocketImg.src = rocketImage3;
              break;
          case 3:
              rocketImg.src = rocketImage4;
              break;
      }
  }
}, [gameState]);


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

      const numBet = parseFloat(betAmount);
      const numBall = parseFloat(ball);
      if (numBet > 0 && numBet <= numBall && gameId) {
        console.log(`NUM BET ${numBet}`);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_jucator: id_j, suma: numBet }) 
        };

        fetch('https://pacanelephp.herokuapp.com/v1/placeBet', requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Verifică dacă răspunsul are conținut înainte de a-l analiza ca JSON
        return response.text().then(text => text ? JSON.parse(text) : {})
    })
    .then(data => console.log(data))
    .catch(error => console.error('A apărut o eroare la plasarea pariului:', error));
          const storedData = localStorage.getItem("userData");
          const userData = JSON.parse(storedData);
          userData.account_profile.money = (parseFloat(userData.account_profile.money) - parseInt(numBet)).toString();
          localStorage.setItem('userData', JSON.stringify(userData));
          setBalance(userData.account_profile.money);
          setVlabetI(numBet);
        setBetButtonDisabled(true);
      }
    };


    

    const cashout = () => {
      // Calculate the cashout amount
      const cashoutAmount = parseFloat(valBeti) * parseFloat(currentMultiplier);
    
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_jucator: id_j, multiplier }) 
      };
    
      fetch('https://pacanelephp.herokuapp.com/v1/cashout', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
    
          // Update the local storage after cashing out
          const storedData = localStorage.getItem("userData");
          const userData = JSON.parse(storedData);
          userData.account_profile.money = (parseFloat(userData.account_profile.money) + cashoutAmount).toString();
          localStorage.setItem('userData', JSON.stringify(userData));
          setBetButtonDisabled(true);
          setBalance(userData.account_profile.money);
        })
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
          <h3 className="custom-h1">Balanța mea: <span id="balance">{ball}$</span></h3>
            <label htmlFor="bet-amount">Bet amount</label>
            <input 
                type="text" 
                id="bet-amount" 
                value={betAmount} 
                onChange={e => setBetAmount(e.target.value)}
            />
            <button onClick={buttonLabel === "Place Bet" ? handlePlaceBet : cashout} disabled={betButtonDisabled}>{buttonLabel}</button>
          </div>
        </div>
      </div>
    )
}

export default Crash;
