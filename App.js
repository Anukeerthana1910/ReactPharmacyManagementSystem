import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { MedicineProvider } from './context/MedicineContext'; 

function App() {
  const [user, setUser] = useState(null); 

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignUp = () => {
    // You might want to set additional state here for signup
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <MedicineProvider>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route path="/home" element={user ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </MedicineProvider>
    </Router>
  );
}

export default App;
