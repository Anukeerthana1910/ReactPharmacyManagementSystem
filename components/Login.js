import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${email}`);
      const users = response.data;
  
      if (users.length > 0 && users[0].password === password) {
        const userData = { email: users[0].email, firstName: users[0].firstName };
        onLogin(userData);
        navigate('/home');
      } else {
        alert('Invalid password or Email');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };
  

  return (
    <div className='overall'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className='input'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p className='RegisterLink'>
          Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
