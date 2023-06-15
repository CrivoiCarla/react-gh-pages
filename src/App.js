import React, { useState } from "react";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Crash,
  Raffle,
  Roulette,
  Register,
  Login,
  Contact,
  Profile
} from "./components";

function App() {


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
  // ______________________________________________
   
  const [isLoggedIn, setIsLoggedIn] = useState(false); // adaugăm starea pentru autentificare

  const handleLogin = () => {
    setIsLoggedIn(true); // funcția de setare a stării autentificării
  }

  const handleLogout = () => {
    setIsLoggedIn(false); // funcția de setare a stării deconectării
  }


  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/raffle" element={<Raffle />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} /> 
        {isLoggedIn ? <Route path="/profile" element={<Profile />} /> : null}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
