import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Register.css';
import ImagePicker from './ImagePicker';

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
  // const handleAccountPhotoChange = (event) => setAccountPhoto(event.target.value);


  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const handleAccountPhotoChange = () => {
    setIsImagePickerOpen(true);
  };
  const handleImageSelect = (image) => {
    setAccountPhoto(image);
    setIsImagePickerOpen(false);
  };
  
  
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
    console.log(user);
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
      
      const data = await response.json();
      console.log('Răspunsul serverului:', data);
      
      // Check if the request was successful
      if (response.ok) {
        console.log('Contul a fost înregistrat cu succes.');
        alert('Contul a fost înregistrat cu succes.'); // Mesajul de succes
      } else {
        // If the request was unsuccessful, throw an error
        console.log('A apărut o eroare la înregistrare:', data);
        alert('A apărut o eroare la înregistrare: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.log('A apărut o eroare la înregistrare:', error);
      alert('A apărut o eroare la înregistrare: ' + error);
    }
  };
  
  
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      
      {isImagePickerOpen && (
        <ImagePicker onSelect={handleImageSelect} onClose={() => setIsImagePickerOpen(false)} />
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="white-label">Name</label>
        <input value={name} onChange={handleNameChange} type="text" placeholder="Full name" id="name" name="name" />
        <label htmlFor="surname">Surname</label>
        <input value={surname} onChange={handleSurnameChange} type="text" placeholder="Surname" id="surname" name="surname" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="username">Username</label>
        <input value={username} onChange={handleUsernameChange} type="text" placeholder="Username" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={handlePasswordChange} type="password" placeholder="****" id="password" name="password" />
        <label htmlFor="phoneNumber">Phone number</label>
        <input value={phoneNumber} onChange={handlePhoneNumberChange} type="text" placeholder="Phone number" id="phoneNumber" name="phoneNumber" />
        <label htmlFor="age">Age</label>
        <input value={age} onChange={handleAgeChange} type="text" placeholder="Age" id="age" name="age" />
        <button type="button" onClick={handleAccountPhotoChange}>Select Account Photo</button>
        <button type="submit">Register</button>
      </form>
      
      <Link to="/login" className="link-btn">Go to Login Page.</Link>
    </div>
);
};

export default RegisterPage;