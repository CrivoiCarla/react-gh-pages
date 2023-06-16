import React, { useEffect, useRef, useState, useCallback } from "react";
import "../css/Raffle.css";
// import "../css/Lottery.css";
import Footer from './Footer';
import { useNavigate  } from "react-router-dom";
import petrisorImage from '../image/petrisor-profile.jpg';
import carlaImage from '../image/carla-profile.jpg';


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

function Lottery()  {




    // // NAVBAR_________________________

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

// // FINAL NAVBAR_______________________

    const token = getToken();
    const navigate = useNavigate();
    const [currentBalance, setCurrentBalance] = useState(1000);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [participants, setParticipants] = useState([]);
    const [bet, setBet] = useState("");
    const [spinWheelDisabled, setSpinWheelDisabled] = useState(true);
    const [gameId, setGameId] = useState(null);

    const betAmount = useRef();
    const circleInnerText = useRef();
    const circleAnimation = useRef();
    const miniRoulette = useRef();
    const participantsList = useRef();
    const [winnerName, setWinnerName] = useState(null);
    const [winnerPhoto, setWinnerPhoto] = useState(null);
    const [id_j, setId] = useState(null);
    const [ball, setBalance] = useState(null);
    const [betButtonDisabled, setBetButtonDisabled] = useState(false);
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          //DE AICI IEI DATELE DESPRE PARTICIPANT/ BANI SI ID ETC

          setId(userData.id)
          console.log(`Id jucator: ${id_j}`);
        //   setName(userData.name);
        //   setAge(userData.age);
          setBalance(userData.account_profile.money);
        //   setPassword(userData.password);
          setUserDataLoaded(true);
        //   setPhoto(userData.account_profile.photo);
        } else {
          navigate('/login') // Redirecționează către pagina de login
        }
      }, []);  
      
      useEffect(() => {
        console.log(`Id jucator: ${id_j}`);
    }, [id_j]);
    
      
    const fillProgress = () => {
        setProgress(0);
        setPlaceBet(false);
        const timePerPercent = 2000 / 100;
        const interval = setInterval(() => {
          setProgress((oldProgress) => {
            const newProgress = oldProgress + 0.1;
            if (newProgress >= 100) {
              clearInterval(interval);
              setPlaceBet(true);
              const winnerData = chooseWinner();
              createProfileChain(winnerData);
              setBetButtonDisabled(true);
            }
            return newProgress;
          });
        }, timePerPercent / 10);
        setProgressInterval(interval);
      };


    const resetAnimation = () => {
        setProgress(0);
        setShowChainElements(false);
        setParticipants([]);
        setWinnerName(null);
        setWinnerPhoto(null);
        const profileChain = document.getElementById('profileChain');
        if (profileChain) {
          profileChain.innerHTML = '';
        }
        setBet("");
        setPlaceBet(false);
        setCurrentTotal(0);
        if (progressRingGold.current) {
            const radiusGold = progressRingGold.current.r.baseVal.value;
            const circumferenceGold = 2 * Math.PI * radiusGold;
            progressRingGold.current.style.strokeDashoffset = circumferenceGold;
        }
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
        setBetButtonDisabled(false);
        fillProgress(); // dacă doriți să începeți imediat umplerea cercului după resetare.
    };
    

    

    useEffect(() => {
        const getIdRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) 
        };
    
        fetch('https://pacanelephp.herokuapp.com/v1/getID', getIdRequestOptions)
            .then(response => {
                return response.json().then(data => {
                    if (!response.ok) {
                        console.error(`A apărut o eroare la obținerea ID-ului jocului: ${JSON.stringify(data)}`);
                        throw new Error(`A apărut o eroare la obținerea ID-ului jocului: ${JSON.stringify(data)}`);
                        console.log("Răspunsul serverului:", data);
                    } else {
                        console.log("Răspunsul serverului:", data);
                        console.log(`Răspuns de la server: ${JSON.stringify(data)}`);
                        return data;
                    }
                });
            })
            .then(data => {
                setGameId(data.id);
            })
            .catch(error => console.error(error));
            
    }, []);
    // useEffect(() => {
    //     const getIdRequestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({}) 
    //     };
    
    //     fetch('https://pacanelephp.herokuapp.com/v1/getID', getIdRequestOptions)
    //         .then(response => {
    //             return response.text().then(text => {
    //                 console.log(`Răspuns de la server: ${text}`);
    //                 if (!response.ok) {
    //                     throw new Error(`A apărut o eroare la obținerea ID-ului jocului: ${text}`);
    //                 } else {
    //                     return JSON.parse(text);
    //                 }
    //             });
    //         })
    //         .then(data => {
    //             setGameId(data.id);
    //         })
    //         .catch(error => console.error(error));
            
    // }, []);
    
    
  
    useEffect(() => {
        console.log(`Id joc: ${gameId}`);
    }, [id_j]);
    

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const addParticipant = (name, bet) => {
        setParticipants(prevParticipants => [...prevParticipants, { name, bet }]);
    }

    
    useEffect(() => {
        if (gameId === null) {
            return;
        }

        const getIdRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) 
        };
    
        fetch('https://pacanelephp.herokuapp.com/v1/getID', getIdRequestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(`A apărut o eroare la obținerea ID-ului jocului: ${JSON.stringify(data)}`);
                    });
                }
                return response.json();
                
            })
            .then(data => {
                setGameId(data.id);
            })
            
            .catch(error => console.error(error));
            
    
        const interval = setInterval(() => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ game_id: gameId }) 
            };
            console.log(`Id joc: ${gameId}`);
            fetch(`https://pacanelephp.herokuapp.com/v1/seeParticipants/${gameId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data.participants)) {
                        const participants = data.participants.map(participantStr => JSON.parse(participantStr));
                        participants.sort((a, b) => b.suma - a.suma);
                        const processedParticipants = participants.map(participant => ({ 
                            name: participant.name,
                            bet: participant.suma
                        }));
                        setParticipants(processedParticipants);  
    
                        const total = participants.reduce((sum, participant) => sum + participant.suma, 0);
                        setCurrentTotal(total);
                    } else {
                        console.error('Răspunsul serverului nu este un array.');
                    }
                })
                .catch(error => console.error('A apărut o eroare la obținerea participanților:', error));
        }, 500);
    
        return () => clearInterval(interval);
    }, [gameId]);
    

    
const progressRingGold = useRef(null);
  const [progress, setProgress] = useState(0);
  const [placeBet, setPlaceBet] = useState(false);
  const [progressInterval, setProgressInterval] = useState(null);



useEffect(() => {
    if (progressRingGold.current) {
      const radiusGold = progressRingGold.current.r.baseVal.value;
      const circumferenceGold = 2 * Math.PI * radiusGold;
      
      progressRingGold.current.style.strokeDasharray = `${circumferenceGold} ${circumferenceGold}`;
      progressRingGold.current.style.strokeDashoffset = circumferenceGold;
  
      fillProgress();
  
      return () => {
        if (progressInterval) clearInterval(progressInterval);
      };
    }
  }, []);

  useEffect(() => {
    if (progressRingGold.current) {
      const radiusGold = progressRingGold.current.r.baseVal.value;
      const circumferenceGold = 2 * Math.PI * radiusGold;
      const offset = circumferenceGold - (progress / 100) * circumferenceGold;
      progressRingGold.current.style.strokeDashoffset = offset;
    }
  }, [progress]);

    const handlePlaceBet = () => {
        console.log(`Ai incercat! ball = ${ball}, bet : ${bet}`);
        console.log(Number.isFinite(bet));
        const numBet = parseFloat(bet);
        const numBall = parseFloat(ball);
        console.log(gameId);
        const numJuc = parseFloat(id_j);
        if (numBet > 0 && numBet <= numBall && gameId) {
            console.log(`Ai reusit!`);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: numJuc , game_id: gameId, suma: bet })
            };

            fetch('https://pacanelephp.herokuapp.com/v1/addParticipant', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (!data.succes) {
                        console.error('A apărut o eroare la adăugarea participantului');
                    }
                });
                console.log(`Am adaugat participantul : ${id_j} cu suma : ${bet}`);
                const storedData = localStorage.getItem("userData");
                const userData = JSON.parse(storedData);
                userData.account_profile.money = (parseFloat(userData.account_profile.money)  - numBet).toString() ;
                localStorage.setItem('userData', JSON.stringify(userData));
        
                setBetButtonDisabled(true);
        }
    }
    const [showChainElements, setShowChainElements] = useState(false);
    const participantsListRef = useRef(null);


        const showChainElementsFunc = () => {
            setShowChainElements(true);
        };

        const chooseWinner = () => {
            return {
                name: 'Carol',
                photo: './img/Carol-profile.jpg',
                index: 115,
            };
        };
        // const chooseWinner = async () => {

        //     const getIdRequestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({}) 
        //     };
        
        //     let gameId;
        
        //     try {
        //         const response = await fetch('https://pacanelephp.herokuapp.com/v1/getID', getIdRequestOptions);
        
        //         if (!response.ok) {
        //             const data = await response.json();
        //             throw new Error(`A apărut o eroare la obținerea ID-ului jocului: ${JSON.stringify(data)}`);
        //         }
        
        //         const data = await response.json();
        //         gameId = data.id;
        
        //     } catch (error) {
        //         console.error(error);
        //         return;
        //     }
        
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //     };
        
        //     try {
        //         const response = await fetch(`https://pacanelephp.herokuapp.com/v1/chooseWinner/${gameId}`, requestOptions);
                
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        
        //         const data = await response.json();
        
        //         if (data) {
        //             console.log(data.name);
        //             return {
        //                 name: data.name,
        //                 photo: data.photo,
        //                 index: 111, 
        //                 targetOffset: 0,
        //             };
        //         }
                
        //     } catch (error) {
        //         console.error(`A apărut o eroare: ${error}`);
        //     }
        // };
        
        
        
        

    
    const animateProfileChain = useCallback((winnerData) => {
        const profileChain = document.getElementById('profileChain');
        const images = profileChain.getElementsByTagName('img');
        // const imageWidth = images[0].offsetWidth;
        const imageWidth = 100;
        const spaceBetweenImages = 10;
        const winnerIndex = winnerData.index;
        // const targetOffset = winnerIndex * (imageWidth + spaceBetweenImages);
        const targetOffset = 102 * (imageWidth + spaceBetweenImages) - 50;
    
        const duration = 10000;
        const startTime = performance.now();
            
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
        
            // function easeOutCubic(t) {
            //     return 1 - Math.pow(1 - t, 3);
            // }

            function easeOutExpo(t) {
                return 1 - Math.pow(1 - t, 10);
            }
        
            const easedProgress = easeOutExpo(progress);
            const currentOffset = easedProgress * targetOffset;
        
            if (progress < 1) {
                profileChain.style.transform = `translateX(-${currentOffset}px)`;
                requestAnimationFrame(step);
            } else {
                profileChain.style.transform = `translateX(-${targetOffset}px)`;
                // alert(`Câștigătorul este: ${winnerData.name}`);
                alert(`Câștigătorul este: Carol`);
                resetAnimation();
            }
        }
        const storedData = localStorage.getItem("userData");
        const userData = JSON.parse(storedData);
        userData.account_profile.money = (parseFloat(userData.account_profile.money)  + currentTotal).toString() ;
        localStorage.setItem('userData', JSON.stringify(userData));
        requestAnimationFrame(step);
    }, []);

    const createProfileChain = useCallback(async (winnerData) => {
        const profileChain = document.getElementById('profileChain');
        // const participants = Array.from(participantsListRef.current.children).map(li => li.innerText);
        // const randomParticipants = createRandomParticipantsList(participants);
    
        let totalOffset = 0;
    
        for (let i = 0; i < 171; i++) {
            let participantName;
            let imageWidth;
            const img = document.createElement('img');
            // if (i < 115) {
            //     // participantName = randomParticipants[i % randomParticipants.length];
            //     participantName = 'Petrisor'
            //     imageWidth = 100;
            //     // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\petrisor-profile.jpg`;
            //     // img.src = process.env.PUBLIC_URL + '../image/petrisor-profile.jpg';
            //     img.src = petrisorImage;
            // } 
            if (i < 115) {
                // alege aleator între "Petrisor" și "Carla"
                if (Math.round(Math.random())) {
                    participantName = 'Petrisor';
                    img.src = petrisorImage;
                    // img.src = process.env.PUBLIC_URL + '/img/petrisor-profile.jpg';
                } else {
                    participantName = 'Carla';
                    img.src = carlaImage;
                    // img.src = process.env.PUBLIC_URL + '/img/carla-profile.jpg';
                }
                imageWidth = 100;
            }else if (i === 115) {
                participantName = 'Carol';
                // winnerData.index = i;
                imageWidth = 100;
                // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\carol-profile.jpg`;
                img.src = process.env.PUBLIC_URL + '/img/carol-profile.jpg';
            } else {
                participantName = 'Carla';
                // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\carla-profile.jpg`;
                // img.src = process.env.PUBLIC_URL + '/img/carla-profile.jpg';
                img.src = carlaImage;
            }
    
            img.alt = participantName;
            img.width = imageWidth;
            profileChain.appendChild(img);
    
            totalOffset += imageWidth;
        }
        winnerData = await chooseWinner();

        if (winnerData) {
            winnerData.targetOffset = totalOffset;
            showChainElementsFunc();
            setTimeout(() => {
                animateProfileChain(winnerData);
            }, 2000);
        } else {
            console.error('Datele câștigătorului nu sunt disponibile.');
        }
    
    }, [animateProfileChain, showChainElementsFunc]);

    
    
    const createRandomParticipantsList = (participants) => {
        // codul pentru a crea o listă aleatorie de participanți
    };

    //console.log(token)
    if (token=='undefined') {
        navigate("/login"); // Redirecționează către pagina de login
        return null; // Sau o componentă de încărcare
    }
    
    // Render...
    return (
        <>
        
        <>
        <div className="custom-container">
        <h1 className="custom-h1">Balanța mea: <span id="balance">{ball}$</span></h1>
        <div className="custom-wheel-container">
            <div className="custom-circle">
                <div className="progress-container">
                    <svg className="progress-ring-gold" width="300" height="300">
                        <circle className="progress-ring__circle-gold" stroke="rgb(29, 197, 226)" strokeWidth="25" fill="transparent" r="135.5" cx="150" cy="150" ref={progressRingGold} />
                    </svg>
                </div>
                <span id="totalAmount" className="custom-totalAmount">{currentTotal}$</span>
                <div className="load-wrapp">
                    <div className="load-9">
                        <div className="spinner">
                            <div className="bubble-1"></div>
                            <div className="bubble-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`custom-profile-chain-container ${showChainElements ? '' : 'custom-hidden'}`}>
            <div id="yellowLine" className={`custom-yellow-line ${showChainElements ? '' : 'custom-hidden'}`}></div>
            <div className={`custom-profile-chain-wrapper ${showChainElements ? '' : 'custom-hidden'}`}>
                <div className="custom-profile-chain" id="profileChain"></div>
            </div>
        </div>
        <div className="custom-controls">
            <label htmlFor="betAmount" className="custom-controls-label">Suma pariului:</label>
            <input type="number" id="betAmount" min="1" max="1000" className="custom-controls-input" ref={betAmount} value={bet} onChange={(e) => setBet(e.target.value)} />
            <button id="placeBet" className="custom-controls-button" onClick={handlePlaceBet} disabled={betButtonDisabled}>Pariază</button>
        </div>
        <ul id="participantsList" className="custom-participantsList" ref={participantsList}>
            {participants.map((participant, index) => (
                <li key={index} className="custom-participantsList-li">{participant.name}: {participant.bet}$</li>
            ))}
        </ul>
    </div>

     <Footer />
        </>
        </>
    );
};
export default Lottery;