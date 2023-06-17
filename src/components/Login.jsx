import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../css/Login.css';
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ setToken }) => {
  // Definirea funcției setToken în cadrul componentei Login
  function setToken(userToken) {
    sessionStorage.setItem('userData', JSON.stringify(userToken));
  }

  // Definirea funcției getToken în cadrul componentei Login
  function getToken() {
    const tokenString = sessionStorage.getItem('userData');
    const userToken = JSON.parse(tokenString);
    console.log(userToken?.id)
    return userToken?.id;
  }

  // Utilizarea hook-ului useNavigate pentru a obține funcția navigate pentru redirecționare
  const navigate = useNavigate();

  // Definirea stării locale pentru email și password utilizând hook-ul useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Funcția care este apelată la submit-ul formularului de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificarea datelor trimise în consolă
      console.log("Datele trimise:", { email, password });
  
      // Configurarea opțiunilor pentru cererea de login
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      const requestOptions = {
        method: "POST",
        headers: {
          'Origin': "https://pacanele.herokuapp.com",
        },
        body: JSON.stringify({ email, password })
      };
  
      // Realizarea cererii de login
      const response = await fetch(
        "https://pacanelephp.herokuapp.com/v1/login",
        requestOptions
      );
  
      // Extrageți răspunsul sub formă de text
      const data = await response.text();
      
      // Afișarea întregului răspuns în consolă
      console.log("Răspunsul serverului:", data);
  
      const data1 = JSON.parse(data);
  
      if (data1?.id) {
        console.log("User logged in successfully");
        //console.log(data1);
        
        // Setarea tokenului în stocarea sesiunii și locală
        setToken(JSON.stringify(data1));
        localStorage.setItem("userData", JSON.stringify(data1));
        sessionStorage.setItem("userData", JSON.stringify(data1));
        //console.log(getToken());
  
        // Redirecționarea către pagina de profil
        navigate("/profile");
      } else {
        alert("Invalid email or password");
        // Afișarea mesajului de eroare
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
      <Link to="/register" className="link-btn">Don't have an account? Register here.</Link>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;
