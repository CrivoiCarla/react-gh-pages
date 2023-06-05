import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("Petrisor Tanase");
  const [balance, setBalance] = useState(1000);
  const [password, setPassword] = useState("");

  const handleDeposit = () => {
    const amount = prompt("Introduceți suma pe care doriți să o adăugați:");
    if (amount) {
      setBalance(prevBalance => prevBalance + parseInt(amount));
    }
  };

  const handleWithdraw = () => {
    const amount = prompt("Introduceți suma pe care doriți să o retrageți:");
    if (amount && balance >= parseInt(amount)) {
      setBalance(prevBalance => prevBalance - parseInt(amount));
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
    <div>
      <h1>Profilul meu</h1>
      <p>Nume: {name}</p>
      <p>Suma în cont: {balance} RON</p>
      <button onClick={handleDeposit}>Adaugă bani</button>
      <button onClick={handleWithdraw}>Retrage bani</button>
      <button onClick={handleChangePassword}>Schimbă parola</button>
    </div>
  );
}

export default Profile;
