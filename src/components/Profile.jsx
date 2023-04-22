import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Înregistrare modificări profil
  };

  return (
    <div className="auth-form-container">
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} onChange={handleNameChange} type="text" placeholder="Full name" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default Profile;
