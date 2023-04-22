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
  Contact
} from "./components";

function App() {
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
        {/* <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
