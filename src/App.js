// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/sidebar';
import Dashboard from './Components/Dashboard/dash';
import SalesmanList from './Components/Salesmanlist/salesmanlist';
import MapPage from './Components/LiveLoc/LiveTracking';
import AdminDetails from './Components/Admin/AddAdmin';
import LoginPage from './Components/Login/login';
import ForgotPassword from './Components/forgotpassword/forget';
import CodeInput from './Components/forgotpassword/code';
import LocationList from './Components/Location/Location';
import ChangePassword from './Components/forgotpassword/reset';
import Success from './Components/forgotpassword/resetconfirm';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        
        <div className="content">
          <Routes>
            
            <Route path="/salesmanlist" element={<SalesmanList />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/LiveTracking" element={<MapPage/>} />
            <Route path="/AddAdmin" element={<AdminDetails/>} />
            <Route path="/forget" element={<ForgotPassword/>} />
            <Route path="/Location" element={<LocationList/>} />
            <Route path="/Code" element={<CodeInput/>} />
            <Route path="/reset" element={<ChangePassword/>} />
            <Route path="/resetconfirm" element={<Success/>} />
            <Route path="/" element={<LoginPage/>} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
