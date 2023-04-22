// import React, { useState } from "react";

// export const Register = (props) => {
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const [name, setName] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }

//     return (
//         <div className="auth-form-container">
//             <h2>Register</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//             <label htmlFor="name">Full name</label>
//             <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
//             <label htmlFor="email">email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//             <label htmlFor="password">password</label>
//             <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//             <button type="submit">Log In</button>
//         </form>
//         <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
//     </div>
//     )
// }
// export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleSurnameChange = (event) => setSurname(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: name,
      email: email,
      username: username,
      password: password,
      phone_number: phoneNumber,
      surname: surname,
      age: age
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios
      .post('https://proiect-mds-php.herokuapp.com/v1/register', user, config)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} onChange={handleNameChange} type="text" placeholder="Full name" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="username">Username</label>
        <input value={username} onChange={handleUsernameChange} type="text" placeholder="Username" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={handlePasswordChange} type="password" placeholder="********" id="password" name="password" />
        <label htmlFor="phoneNumber">Phone number</label>
        <input value={phoneNumber} onChange={handlePhoneNumberChange} type="text" placeholder="Phone number" id="phoneNumber" name="phoneNumber" />
        <label htmlFor="surname">Surname</label>
        <input value={surname} onChange={handleSurnameChange} type="text" placeholder="Surname" id="surname" name="surname" />
        <label htmlFor="age">Age</label>
        <input value={age} onChange={handleAgeChange} type="text" placeholder="Age" id="age" name="age" />
        <button type="submit">Register</button>

      </form>
      <Link to="/login" className="link-btn">Go to Login Page.</Link>
      
    </div>
  );
};

export default RegisterPage;

