import React from 'react';
import './Success.css';
import checkmarkIcon from './check.png'; // Update the path as per your project structure

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-icon">
        <img src={checkmarkIcon} alt="Success Icon" className="icon-checkmark" />
      </div>
      <h2>Successful</h2>
      <p>Your password has been changed successfully.</p>
    </div>
  );
};

export default Success;
