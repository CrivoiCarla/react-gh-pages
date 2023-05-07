import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifică în consolă datele trimise
      console.log("Datele trimise:", { email, password });

      const response = await fetch('https://proiect-mds-php.herokuapp.com/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User logged in successfully");
        // executa actiunea de logare
      } else {
        console.log("Invalid email or password");
        // afiseaza mesajul de eroare
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

export default Login;
