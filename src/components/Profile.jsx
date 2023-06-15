import React, { useState, useEffect } from "react";
import "../css/Profile.css";
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

function Profile() {
  const token = getToken();
  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [balance, setBalance] = useState(0);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      setId(userData.id)
      setName(userData.name);
      setAge(userData.age);
      setBalance(userData.account_profile.money);
      setPassword(userData.password);
      setUserDataLoaded(true);
      setPhoto(userData.account_profile.photo);
    } else {
      navigate('/login') // Redirecționează către pagina de login
    }
  }, []);

  // Funcția pentru a trata adăugarea de fonduri în cont
  const handleDeposit = async () => {
    
    const amount = prompt("Introduceți suma pe care doriți să o adăugați:");
    if (amount) {
      const newBalance = balance + parseInt(amount);
      const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Origin': "https://pacanele.herokuapp.com",
        },
        body: JSON.stringify({ id: id, money: newBalance })
      };

     // console.log(JSON.stringify({ id: id, money: newBalance }))
      const response = await fetch("https://pacanelephp.herokuapp.com/v1/setmoney", requestOptions);
      const data = await response.json();

      //console.log(data)
      if (true) {
        setBalance(newBalance);
        alert("Depunerea a avut succes!");

        // actualizare date locale
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          userData.account_profile.money = newBalance;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else {
        alert("Depunerea nu a putut fi procesată. Încercați din nou.");
      }
    }
  };

  // Funcția pentru a trata retragerea de fonduri din cont
  const handleWithdraw = async () => {
    const amount = prompt("Introduceți suma pe care doriți să o retrageți:");
    if (amount) {
      const newBalance = balance - parseInt(amount);
      const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Origin': "https://pacanele.herokuapp.com",
        },
        body: JSON.stringify({ id: token, money: newBalance })
      };

      const response = await fetch("https://pacanelephp.herokuapp.com/v1/setmoney", requestOptions);
      const data = await response.json();
      //console.log(data)

      if (newBalance>=0) {
        setBalance(newBalance);
        alert("Retragerea a avut succes!");
         // actualizare date locale
         const storedData = localStorage.getItem("userData");
         if (storedData) {
           const userData = JSON.parse(storedData);
           userData.account_profile.money = newBalance;
           localStorage.setItem('userData', JSON.stringify(userData));
         }
       
      } else {
        alert("Fonduri insuficiente în cont!");
      }
    }
  };

  // Funcția pentru a trata schimbarea parolei
  const handleChangePassword = async () => {
    const newPassword = prompt("Introduceți noua parolă:");
    if (newPassword) {
      const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Origin': "https://pacanele.herokuapp.com",
        },
        body: JSON.stringify({ id: token, password: newPassword })
      };

      const response = await fetch("https://pacanelephp.herokuapp.com/v1/changepass", requestOptions);
      const data = await response.json();

      if (data.success === 'true') {
        setPassword(newPassword);
        alert("Parola a fost schimbată cu succes!");

        // actualizare date locale
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          userData.password = newPassword;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      } else {
        alert("Nu s-a putut schimba parola. Încercați din nou.");
      }
    }
  };

  // Verificarea tokenului și redirecționarea către pagina de login dacă tokenul lipsește
  if (!token) {
    navigate("/login"); // Redirecționează către pagina de login
    return null; // Sau o componentă de încărcare
  }

  return (
    <div className="cnt">
      <h1 className="profile__title">Profilul meu</h1>
      <div className="profile__info">
        <p className="profile__info-item">
          <span className="profile__info-label">Nume:</span> {name} - {age} ani
        </p>
      </div>
      <div className="profile__image">
        <img src={photo} alt="Profile" />
      </div>
      <div className="profile__money">
        <p className="profile__info-label">Suma în cont:</p>
        <p className="profile__info-item">{balance} RON</p>
      </div>
      <div className="profile__actions">
        <button className="profile__action-button" onClick={handleDeposit}>
          Adaugă bani
        </button>
        <button className="profile__action-button" onClick={handleWithdraw}>
          Retrage bani
        </button>
        <button className="profile__action-button" onClick={handleChangePassword}>
          Schimbă parola
        </button>
      </div>
    </div>
  );
}

export default Profile;
