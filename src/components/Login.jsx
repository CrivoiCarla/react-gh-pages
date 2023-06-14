import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const navigate = useNavigate(); // Utilizați hook-ul useNavigate pentru a redirecționa utilizatorul

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifică în consolă datele trimise
      console.log("Datele trimise:", { email, password });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      const requestOptions = {
        method: "POST",
        headers: {
          'Origin': "https://pacanele.herokuapp.com",
        },
        body: JSON.stringify({ email, password })
      };

      const response = await fetch(
        "https://pacanelephp.herokuapp.com/v1/login",
        requestOptions
      );

      const data = await response.text();
      //console.log(data);

      if (response.ok) {
        console.log("User logged in successfully");
        localStorage.setItem("userData", JSON.stringify(data));
       // Redirecționează către pagina de profil
       window.location.href = "/profile";
       


      } else {
        console.log("Invalid email or password");
        // afișează mesajul de eroare
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
