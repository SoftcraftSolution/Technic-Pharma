import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Location.css';
import Sidebar from '../Sidebar/sidebar';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://technic-farma-backend.vercel.app/user/get-location-list');
                // Extract salesmen data from the nested structure
                const salesmen = response.data.body.users.flatMap(user => user.salesmen.map(salesman => ({
                    salesmanName: user.name,
                    phoneNumber: user.phone,
                    locationName: salesman.location,
                    image: salesman.image,
                    time: salesman.createdAt,
                    date: salesman.createdAt,
                    status: user.isActive ? 'Active' : 'Inactive'
                })));
                setLocations(salesmen);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching location data:', error);
                if (error.response) {
                    console.error('Server responded with status code:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
                setError('Failed to fetch location data.');
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredLocations = locations.filter(location =>
        location.salesmanName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <Sidebar />
            <div className="location-list">
                <header>
                    <h1>Location</h1>
                    <div className="search-filter">
                        <input
                            type="text"
                            placeholder="Search by Salesman Name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="filter-sort">Filter & Sort</button>
                    </div>
                </header>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Salesman Name</th>
                                    <th>Phone No</th>
                                    <th>Location Name</th>
                                    <th>Address</th>
                                    <th>Image</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLocations.map((location, index) => (
                                    <tr key={index}>
                                        <td>{location.salesmanName}</td>
                                        <td>{location.phoneNumber}</td>
                                        <td>{location.locationName}</td>
                                        <td>{location.address || 'N/A'}</td>
                                        <td><img src={location.image} alt={location.locationName} className="location-image" /></td>
                                        <td>{new Date(location.time).toLocaleTimeString()}</td>
                                        <td>{new Date(location.date).toLocaleDateString()}</td>
                                        <td className={location.status === 'Active' ? 'status-active' : 'status-inactive'}>{location.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <p>Showing {filteredLocations.length} of {locations.length} entries</p>
                            <div className="pagination-controls">
                                <button>Previous</button>
                                <span>1</span>
                                <button>Next</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LocationList;
