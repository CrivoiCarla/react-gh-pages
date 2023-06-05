import React, { useState } from "react";
import '../css/Profile.css';


function Profile() {
  const [name, setName] = useState("John Doe");
  const [balance, setBalance] = useState(1000);
  const [password, setPassword] = useState("");

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
          <span className="profile__info-label">Nume:</span> {name}
        </p>
        <p className="profile__info-item">
          <span className="profile__info-label">Suma în cont:</span> {balance} RON
        </p>
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
