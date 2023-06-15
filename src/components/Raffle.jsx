import React, { useEffect, useRef, useState, useCallback } from "react";
import "../css/Raffle.css";
// import "../css/Lottery.css";
import Footer from './Footer';
import { useNavigate  } from "react-router-dom";


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
    }, []);
  


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
    
        const interval = setInterval(() => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ game_id: gameId }) 
            };
    
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
        if (bet > 0 && bet <= currentBalance && gameId) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: 77, game_id: gameId, suma: bet })
            };

            fetch('https://pacanelephp.herokuapp.com/v1/addParticipant', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (!data.succes) {
                        console.error('A apărut o eroare la adăugarea participantului');
                    }
                });
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


    
    const animateProfileChain = useCallback((winnerData) => {
        const profileChain = document.getElementById('profileChain');
        const images = profileChain.getElementsByTagName('img');
        // const imageWidth = images[0].offsetWidth;
        const imageWidth = 100;
        const spaceBetweenImages = 10;
        const winnerIndex = winnerData.index;
        // const targetOffset = winnerIndex * (imageWidth + spaceBetweenImages);
        const targetOffset = 111 * (imageWidth + spaceBetweenImages);
    
        const duration = 10000;
        const startTime = performance.now();
            
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
        
            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }
        
            const easedProgress = easeOutCubic(progress);
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
        
        requestAnimationFrame(step);
    }, []);

    const createProfileChain = useCallback((winnerData) => {
        const profileChain = document.getElementById('profileChain');
        // const participants = Array.from(participantsListRef.current.children).map(li => li.innerText);
        // const randomParticipants = createRandomParticipantsList(participants);
    
        let totalOffset = 0;
    
        for (let i = 0; i < 171; i++) {
            let participantName;
            let imageWidth;
            const img = document.createElement('img');
            if (i < 115) {
                // participantName = randomParticipants[i % randomParticipants.length];
                participantName = 'Petrisor'
                imageWidth = 100;
                // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\petrisor-profile.jpg`;
                img.src = process.env.PUBLIC_URL + '/img/petrisor-profile.jpg';
            } else if (i === 115) {
                participantName = 'Carol';
                // winnerData.index = i;
                imageWidth = 100;
                // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\carol-profile.jpg`;
                img.src = process.env.PUBLIC_URL + '/img/carol-profile.jpg';
            } else {
                participantName = 'Carla';
                // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img\carla-profile.jpg`;
                img.src = process.env.PUBLIC_URL + '/img/carla-profile.jpg';
            }
    
           
            // img.src = `C:\Users\stanc\Desktop\MDS\tombola\src\img/${participantName.toLowerCase()}-profile.jpg`;
            // img.src = `https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fwide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg&tbnid=huxi_OqxC54EPM&vet=12ahUKEwj8nP_vubf_AhVugv0HHfKODC4QMygMegUIARDcAQ..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fnature&docid=phMLnQWV-ANRGM&w=626&h=418&itg=1&q=photos&client=opera-gx&ved=2ahUKEwj8nP_vubf_AhVugv0HHfKODC4QMygMegUIARDcAQ`;
            img.alt = participantName;
            img.width = imageWidth;
            profileChain.appendChild(img);
    
            totalOffset += imageWidth;
        }
    
        winnerData.targetOffset = totalOffset;
        showChainElementsFunc();
        setTimeout(() => {
            animateProfileChain(winnerData);
        }, 2000);
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
        <h1 className="custom-h1">Balanța mea: <span id="balance">{currentBalance}$</span></h1>
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
            <button id="placeBet" className="custom-controls-button" onClick={handlePlaceBet}>Pariază</button>
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