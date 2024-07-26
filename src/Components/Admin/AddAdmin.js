import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import adminImage from './adminimg.jpg'; // Import your admin image here

import './admin.css'; // Import external CSS file
import Sidebar from '../Sidebar/sidebar';


const AdminDetails = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admins from API endpoint
    axios.get('https://dashboard-backend-a5in.vercel.app/user/list-all-admin')
      .then(response => {
        setAdmins(response.data); // Update admins state with fetched data
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
        // Handle error as needed
      });
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  const handleAddAdminClick = () => {
    navigate('/newadmin'); // Navigate to the add-admin route
  };

  const handleLogoutClick = () => {
    navigate('/'); // Navigate to the logout route
  };

  return (
    
    <div className="App">
     <Sidebar/>
      <div className="addadmin-container">
        <div className="addadmin-main-content">
         
          <div className="addadmin-header">
            <h1 className="addadmin-heading">Admin Details</h1>
            <button className="addadmin-button-small" onClick={handleAddAdminClick}>Add Admin</button>
          </div>
          <div className="addadmin-content">
            <div className="addadmin-info">
              <img src={adminImage} alt="Admin" className="addadmin-image" />
              <div>
                <h1 className="addadmin-heading1">Admin Details</h1>
                <p className="addadmin-subheading">Welcome, City Hospital</p>
              </div>
            </div>
            <div className="addadmin-details">
              <p className="addadmin-strong-text">Name:</p>
              <p className='addadmin-strong-text'>City Hospital</p> 
              <p className="addadmin-strong-text">Email:</p>
              <p className='addadmin-strong-text'>CityHospital@gmail.com</p>
              <p className="addadmin-strong-text">Mobile:</p>
              <p className='addadmin-strong-text'>+91 7098567389</p>
              <p className="addadmin-strong-text">Address:</p>
              <p className='addadmin-strong-text'>Room no 405, floor no - 4, 98 street, Boston ground. New York city.</p>
            </div>
            <button className="addadmin-button-logout-small" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
          <div className="addadmin-table">
            <h2 className="addadmin-table-heading">List of Admins</h2>
            <table>
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Mobile Number</th>
                  <th>Email ID</th>
                  <th>Date of Joining</th>
                  <th>Role</th> {/* Add Role column */}
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.hospitalName}</td>
                    <td>{admin.mobileNumber}</td>
                    <td>{admin.email}</td>
                    <td>{admin.dateOfJoining}</td>
                    <td>{admin.role}</td> {/* Display role */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
