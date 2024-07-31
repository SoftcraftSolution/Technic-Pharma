import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import adminImage from './adminimg.jpg'; // Import your admin image here
import './admin.css'; // Import external CSS file
import Sidebar from '../Sidebar/sidebar';

const AdminDetails = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/'); // Navigate to the logout route
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="addadmin-container">
        <div className="addadmin-main-content">
          <div className="addadmin-header">
            <h1 className="addadmin-heading">Admin Details</h1>
          </div>
          <div className="addadmin-content">
            <div className="addadmin-info">
              <img src={adminImage} alt="Admin" className="addadmin-image" />
              <div>
                <h1 className="addadmin-heading1">Admin Details</h1>
                <p className="addadmin-subheading">Welcome, Technic Pharma</p>
              </div>
            </div>
            <div className="addadmin-details">
              <p className="addadmin-strong-text">Name:</p>
              <p className='addadmin-strong-text'>Technic Pharma</p> 
              <p className="addadmin-strong-text">Email:</p>
              <p className='addadmin-strong-text'>sales.tpe2002@gmail.com</p>
              <p className="addadmin-strong-text">Mobile:</p>
              <p className='addadmin-strong-text'>+91 8421018613</p>
            </div>
            <button className="addadmin-button-logout-small" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
