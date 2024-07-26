import React, { useState } from 'react';
import axios from 'axios';
import './newadmin.css'; // Import the external CSS file
import Sidebar from '../../Sidebar';

const NewAdminForm = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role value should match your JSON
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert date to the correct format if necessary
    const formattedDateOfJoining = new Date(dateOfJoining).toISOString();

    // Form data object
    const formData = {
      hospitalName,
      mobileNumber,
      email,
      dateOfJoining: formattedDateOfJoining,
      password,
      confirmPassword,
      role
    };

    console.log('Submitting Form Data:', formData);

    try {
      // Sending form data to the backend
      const response = await axios.post('https://dashboard-backend-chi-two.vercel.app/user/create-admin', formData);

      console.log('Response from backend:', response.data);

      // Reset form fields after successful submission
      setHospitalName('');
      setMobileNumber('');
      setEmail('');
      setDateOfJoining('');
      setPassword('');
      setConfirmPassword('');
      setRole('admin'); // Reset role to default value

      // Set success message
      setSuccessMessage('Admin created successfully!');
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error submitting form:', error.response.data);
        setErrorMessage(`Error: ${error.response.data.message || 'Failed to create admin'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error submitting form:', error.request);
        setErrorMessage('Error: No response from server.');
      } else {
        // Something else caused an error
        console.error('Error submitting form:', error.message);
        setErrorMessage(`Error: ${error.message}`);
      }

      // Clear success message
      setSuccessMessage('');
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="form-container">
        <h2>Create New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Hospital Name:</label>
              <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Mobile Number:</label>
              <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Date of Joining:</label>
              <input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-button">Create Admin</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default NewAdminForm;
