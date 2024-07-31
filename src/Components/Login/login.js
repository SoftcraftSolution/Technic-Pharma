import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo2.png';
import logo2 from './logoi.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dashboard-backend-chi-two.vercel.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        // Handle successful login
        console.log('Login successful:', result);
        // Store token, role, and hospital name in session storage
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('role', result.role);
        sessionStorage.setItem('hospitalName', result.hospitalName); // Assuming hospitalName is part of the response

        // Redirect to the dashboard or another page
        navigate('/dash');
      } else {
        // Handle login error
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={logo} alt="Hospital with Ambulance" />
      </div>
      <div className="login-form-section">
        <div className="login-form-container">
          <div className="login-logo">
            <img src={logo2} alt="Logo" />
          </div>
          <h2>Hello!</h2>
          <p>Log in to continue.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-label">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log IN'}
            </button>
            
            {error && <div className="login-error">{error}</div>}
            
            <div className="login-form-footer">
              <label className="login-checkbox-label">
                <input type="checkbox" name="keepSignedIn" className="login-checkbox" />
                Keep me signed in
              </label>
              <a href="#" className="login-forgot-password">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;