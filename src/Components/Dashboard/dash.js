import React, { useState, useEffect } from 'react';
import salesmanIcon from '../assets/total.png';
import activeIcon from '../assets/active.png';
import birthdayIcon from '../assets/cake.png';
import inactiveIcon from '../assets/inactive.png';
import Sidebar from '../Sidebar/sidebar';
import './dash.css';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalSalesmen: 0,
    activeSalesmen: 0,
    birthdaysToday: 0,
    inactiveSalesmen: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('https://technic-farma-backend.vercel.app/user/get-salesman-insights');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCounts({
          totalSalesmen: data.body.totalSalesmen,
          activeSalesmen: data.body.totalActiveSalesmen,
          birthdaysToday: data.body.salesmenBirthdaysToday.length,
          inactiveSalesmen: data.body.totalInactiveSalesmen,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

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
