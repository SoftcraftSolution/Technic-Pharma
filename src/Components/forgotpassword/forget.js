import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import './forgot.css';

const ForgotPassword = () => {
    console.log("in forget");
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://technic-farma-backend.vercel.app/user/admin-forgot-password', {
                email
            });
            setMessage(response.data.message);
            // Navigate to the next page if successful
            if (response.status === 200) {
                navigate('/Code'); // Replace '/next-page' with your target route
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            setError('Failed to request password reset. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <h2>Forgot Password?</h2>
                <p>Enter your email to reset your password.</p>
                {message && <p className="success-message">{message}</p>}
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
                        <button type="submit">Continue</button>
                    </div>
                </form>
                <a href="/login" className="back-link">Back</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
