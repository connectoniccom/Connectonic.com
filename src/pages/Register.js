import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Reusing login styles

const API_BASE_URL = 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <section id="register" className="content-section auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Register</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}

export default Register;
