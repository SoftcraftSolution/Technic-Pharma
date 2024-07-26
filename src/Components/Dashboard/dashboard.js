import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import Sidebar from '../Sidebar/sidebar';
import icon1 from '../assets/cake.png';
const Dashboard = () => {
    const [salesmen, setSalesmen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://technic-farma-backend.vercel.app/user/get-salesman');
                const result = response.data;
                const data = result.body.map(salesman => ({
                    name: salesman.fullname,
                    phone: salesman.phonenumber,
                    gender: salesman.gender,
                    dob: new Date(salesman.dob).toLocaleDateString(),
                    email: salesman.email,
                }));
                setSalesmen(data);
            } catch (error) {
                console.error('Error fetching salesmen data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div className="App">
        <Sidebar />
        <div className="dashboard">
            <div className="dashboard-summary">
                <div className='summary-item-group'>
                    <div className="summary-item">
                    
                        <h3>Total No of Salesman</h3>
                        <h3>1200</h3>
                        
                        
                    </div>
                    <div className="summary-item">
                        <h3>Active Salesman Today</h3>
                        <h3>900</h3>
                    </div>
                </div>
                <div className='summary-item-group'>
                    <div className="summary-item">
                        <h2>Salesman's Birthday Today</h2>
                        <h2>01</h2>
                        <div className='bd'>
                        

                        </div>
                       
                    </div>
                    <div className="summary-item">
                        <h2>Inactive Salesman Today</h2>
                        <h2>300</h2>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default Dashboard;
