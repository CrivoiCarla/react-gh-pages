import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [balance, setBalance] = useState(0);
  const [password, setPassword] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  let userData = null;
  
 // const navigate = useNavigate(); // Utilizați hook-ul useNavigate pentru a redirecționa utilizatorul

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      userData = JSON.parse(storedData);
      setName(userData.name);
      setAge(userData.age);
      setBalance(userData.account_profile.money);
      setPassword(userData.password);
      setUserDataLoaded(true);
    } else {
       // Redirecționați către pagina de logare în cazul în care nu există date utilizator
       return (
        <div className="auth-form-container">
          <label htmlFor="email">Nu esti logat</label>
          <Link to="/login" className="link-btn">Please login here.</Link>
        </div>
       )
    }
  }, [navigate]);

  const handleDeposit = () => {
    const amount = prompt("Introduceți suma pe care doriți să o adăugați:");
    if (amount) {
      setBalance((prevBalance) => prevBalance + parseInt(amount));
    }
  };

  const handleWithdraw = () => {
    const amount = prompt("Introduceți suma pe care doriți să o retrageți:");
    if (amount && balance >= parseInt(amount)) {
      setBalance((prevBalance) => prevBalance - parseInt(amount));
    } else {
      alert("Fonduri insuficiente în cont!");
    }
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Introduceți noua parolă:");
    if (newPassword) {
      setPassword(newPassword);
      alert("Parola a fost schimbată cu succes!");
    }
  };

  return (
    <div className="profile">
      <h1 className="profile__title">Profilul meu</h1>
      <div className="profile__info">
        <p className="profile__info-item">
          <span className="profile__info-label">Nume:</span> {name} - {age} ani
        </p>
      </div>
      <div className="profile__image">
        <img src={userData?.phone_number} alt="Profile" />
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
