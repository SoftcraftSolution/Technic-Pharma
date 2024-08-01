import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making API requests
import './CodeInput.css';

function CodeInput() {
  const [code, setCode] = useState(Array(4).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input
      if (value && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://technic-farma-backend.vercel.app/user/admin-verify-code', {
        email:"sales.tpe2002@gmail.com",
        code: code.join('')
      });
      console.log(code.join(""));
      setMessage(response.data.message); // Assuming the API returns a message on success
      if (response.status === 200) {
        // Handle successful verification and navigate to the next page
        navigate('/reset'); // Replace '/next-page' with your target route
      }
    } catch (error) {
      setError('Invalid code. Please try again.');
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div className="container">
      <div className="instructions">
        <p>Enter the code from the mail we just sent you</p>
      </div>
      <div className="code-inputs">
        {code.map((_, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            value={code[index]}
            onChange={(e) => handleChange(e, index)}
            className="code-input"
          />
        ))}
      </div>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit} className="submit-button">
        Continue
      </button>
      <button onClick={() => console.log('Go back')} className="back-button">
        Back
      </button>
    </div>
  );
}

export default CodeInput;
