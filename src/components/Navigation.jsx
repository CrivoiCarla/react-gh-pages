import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  const [authenticated, setAuthenticated] = useState(false); // variabila de stare pentru autentificare

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            React Multi-Page Website
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/crash">
                  Crash
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/raffle">
                  Raffle
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/roulette">
                  Roulette
                </NavLink>
              </li>
              {authenticated && (
                // afișează link-ul către pagina de profil doar dacă utilizatorul este autentificat
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {!authenticated && (
                // afișează link-urile către paginile de autentificare doar dacă utilizatorul nu este autentificat
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
