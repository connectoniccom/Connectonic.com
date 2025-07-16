import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const API_BASE_URL = 'http://localhost:3001';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        // Handle successful login, e.g., redirect or update state
        console.log('Login successful', data);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Failed to connect to the server.');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  return (
    <section id="login" className="content-section auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit" className="auth-btn">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <div className="social-login">
        <p>Or login with</p>
        <button onClick={() => handleSocialLogin('google')} className="social-btn google">Google</button>
        <button onClick={() => handleSocialLogin('facebook')} className="social-btn facebook">Facebook</button>
        <button onClick={() => handleSocialLogin('github')} className="social-btn github">GitHub</button>
      </div>
      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}

export default Login;
