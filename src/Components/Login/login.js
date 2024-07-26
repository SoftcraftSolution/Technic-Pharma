import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../Login/logoh.png';
import logo1 from '../Login/logoi.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dashboard-backend-chi-two.vercel.app/user/login', {
                email,
                password
            });
            console.log('Login successful:', response.data);
            
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="logo-section">
                <img src={logo} alt="TPE Logo" className="logo" />
            </div>
            <div className="login-section">
                <div className="login-form">
                    <img src={logo1} alt="TPE Logo" className="logo1" />
                    <p>Hello!<br/>Log in to continue.</p>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Log IN</button>
                        </div>
                        <div className="form-options">
                            <label>
                                <input type="checkbox" /> Keep me signed in
                            </label>
                            <a href="/forgot">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
