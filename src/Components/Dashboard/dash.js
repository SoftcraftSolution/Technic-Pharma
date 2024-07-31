import React, { useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import salesmanIcon from '../assets/total.png';
import activeIcon from '../assets/active.png';
import birthdayIcon from '../assets/cake.png';
import inactiveIcon from '../assets/inactive.png';
import './dash.css';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalSalesmen: 120,
    activeSalesmen: 85,
    birthdaysToday: 3,
    inactiveSalesmen: 35,
  });

  return (
    <div className='App'>
      <Sidebar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-content">
              <h2>Total No of Salesman</h2>
              <p>{counts.totalSalesmen}</p>
            </div>
            <img src={salesmanIcon} alt="Total Salesman" className="stat-icon" />
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <h2>Active Salesman Today</h2>
              <p className="active">{counts.activeSalesmen}</p>
            </div>
            <img src={activeIcon} alt="Active Salesman" className="stat-icon" />
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <h2>Salesman's Birthday Today</h2>
              <p>{counts.birthdaysToday}</p>
            </div>
            <img src={birthdayIcon} alt="Salesman Birthday" className="stat-icon" />
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <h2>Inactive Salesman Today</h2>
              <p className="inactive">{counts.inactiveSalesmen}</p>
            </div>
            <img src={inactiveIcon} alt="Inactive Salesman" className="stat-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
