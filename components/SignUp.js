import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [last, setLast] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!text) newErrors.firstName = 'First name is required';
    if (!last) newErrors.lastName = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!age) newErrors.age = 'Age is required';
    else if (isNaN(age) || age < 18) newErrors.age = 'Age must be a number and at least 18';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      firstName: text,
      lastName: last,
      email: email,
      password: password,
      age: age,
      address: address,
    };

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Sign-up successful! You can now log in.');
      onSignUp();
      navigate('/login');
    } else {
      alert('Error signing up.');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pharmacy Management System</h1>
      <div className='anu'>
        <div>
          <img src="https://i.pinimg.com/564x/b5/48/51/b54851dbe044964d21a0f5cc1aed724e.jpg" alt="Example" style={{ width: '500px', height: '600px' }} />
        </div>
        <div className='overall'>
          <div className='signup'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className='input'>
                <label>First Name:</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className='input'>
                <label>Last Name:</label>
                <input type="text" value={last} onChange={(e) => setLast(e.target.value)} required />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
              <div className='input'>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className='input'>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className='input'>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                {errors.age && <span className="error">{errors.age}</span>}
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <div className='RegisterLink'>
              <p>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')}>Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
