import React, { useState } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const email="sales.tpe2002@gmail.com"
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch('https://technic-farma-backend.vercel.app/user/admin-reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword, email}),
        });
        if (response.ok) {
          console.log('Password change successful');
          navigate('/resetconfirm');
          // Handle success (e.g., redirect to login page, show success message, etc.)
        } else {
          console.log('Failed to change password');
          // Handle error (e.g., show error message)
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while changing the password.');
      }
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="container">
      <div className="form-title">
        <h2>Change Password</h2>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="input-group">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Continue
      </button>
      <button onClick={() => console.log('Go back')} className="back-button">
        Back
      </button>
    </div>
  );
}

export default ChangePassword;
