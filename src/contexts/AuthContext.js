import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    // implementare funcție de înregistrare
  };

  const login = (email, password) => {
    // implementare funcție de autentificare
  };

  const logout = () => {
    // implementare funcție de deconectare
  };

  useEffect(() => {
    // implementare verificare existență utilizator autentificat
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
