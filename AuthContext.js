// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated(prevAuth => !prevAuth);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
