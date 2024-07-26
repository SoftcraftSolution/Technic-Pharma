import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';

import icon2 from '../assets/logo2.png';
import icon3 from '../assets/logo3.png';
import icon4 from '../assets/akar-icons_location.png';
import icon5 from '../assets/gravity-ui_person.png';
import icon6 from '../assets/icon-park-outline_sales-report.png';
import icon7 from '../assets/iconamoon_location.png';
import icon8 from '../assets/ri_dashboard-line.png';
import icon9 from '../assets/Vecto.png';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <img id='ggg' src={icon2} alt="Technic Logo" />
                <img id='gggg' src={icon3} alt="Technic Logo" />
            </div>
            <ul className="menu">
                <li className="menu-item active">
                    <Link to="/dashboard"><img id='hg' src={icon8} alt="Dashboard" />Dashboard</Link>
                </li>
                <li className="menu-item">
                    <Link to="/salesmanlist"><img id='hg' src={icon6} alt="Salesman List" />Salesman List</Link>
                </li>
                <li className="menu-item">
                    <Link to="/LiveTracking"><img id='hg' src={icon7} alt="Live Location" />Live Location</Link>
                </li>
                <li className="menu-item">
                    <Link to="/AddAdmin"><img id='hg' src={icon5} alt="Admin Details" />Admin Details</Link>
                </li>
            </ul>
            <div className="user-info">
                <p>Welcome back 👋</p>
                <div className="user-details">
                    <img src={icon} alt="Prakash Shinde" />
                    <p>Prakash Shinde</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
