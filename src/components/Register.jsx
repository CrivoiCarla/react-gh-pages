import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Register.css';

import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [accountPhoto, setAccountPhoto] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleSurnameChange = (event) => setSurname(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleAccountPhotoChange = (event) => setAccountPhoto(event.target.value);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = {
      name: name,
      email: email,
      username: username,
      password: password,
      phone_number: phoneNumber,
      surname: surname,
      age: age,
      account_photo: accountPhoto
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://pacanele.herokuapp.com",
      },
      body: JSON.stringify(user),
    };
  
    try {
      const response = await fetch(
        "https://pacanelephp.herokuapp.com/v1/register",
        requestOptions
      );
      alert("Contul a fost înregistrat"); // Mesajul de succes
    } catch (error) {
      console.log("error", error);
      return 0;
    }
  };
  
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={handleNameChange} type="text" placeholder="Full name" id="name" name="name" />
        <label htmlFor="surname">Surname</label>
        <input value={surname} onChange={handleSurnameChange} type="text" placeholder="Surname" id="surname" name="surname" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="username">Username</label>
        <input value={username} onChange={handleUsernameChange} type="text" placeholder="Username" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={handlePasswordChange} type="password" placeholder="********" id="password" name="password" />
        <label htmlFor="phoneNumber">Phone number</label>
        <input value={phoneNumber} onChange={handlePhoneNumberChange} type="text" placeholder="Phone number" id="phoneNumber" name="phoneNumber" />
        <label htmlFor="age">Age</label>
        <input value={age} onChange={handleAgeChange} type="text" placeholder="Age" id="age" name="age" />
        <label htmlFor="accountPhoto">Account Photo</label>
        <input value={accountPhoto} onChange={handleAccountPhotoChange} type="text" placeholder="Account Photo" id="accountPhoto" name="accountPhoto" />
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="link-btn">Go to Login Page.</Link>
    </div>
  );
};

export default RegisterPage;
