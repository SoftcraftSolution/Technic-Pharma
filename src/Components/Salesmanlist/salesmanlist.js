import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './salesmanlist.css';
import Sidebar from '../Sidebar/sidebar';

const SalesmanList = () => {
    const [salesmen, setSalesmen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [checkedState, setCheckedState] = useState({});

    useEffect(() => {
        const fetchSalesmen = async () => {
            try {
                const response = await axios.get('https://technic-farma-backend.vercel.app/user/get-salesman');
                const salesmenData = response.data.body;
                setSalesmen(salesmenData);
                setCheckedState(
                    salesmenData.reduce((acc, salesman) => {
                        acc[salesman._id] = salesman.isAdminApproved;
                        return acc;
                    }, {})
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching salesmen data:', error);
                setError('Failed to fetch salesmen data.');
                setLoading(false);
            }
        };
        fetchSalesmen();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const handleCheckboxChange = async (id) => {
        const newCheckedState = !checkedState[id];
        try {
            const response = await axios.post(`https://technic-farma-backend.vercel.app/user/admin-approved?id=${id}`, {
                isAdminApproved: newCheckedState.toString()
            });
            if (response.status === 200) {
                setCheckedState((prevState) => ({
                    ...prevState,
                    [id]: newCheckedState,
                }));
            }
        } catch (error) {
            console.error('Error updating salesman status:', error);
        }
    };

    const filteredSalesmen = salesmen
        .filter((salesman) => 
            salesman.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
            salesman.phonenumber.includes(searchTerm)
        )
        .sort((a, b) => {
            if (!sortField) return 0;
            const valueA = a[sortField];
            const valueB = b[sortField];
            if (sortOrder === 'asc') {
                return valueA > valueB ? 1 : -1;
            }
            return valueA < valueB ? 1 : -1;
        });

    return (
        <div className="App">
            <Sidebar />
            <div className="salesman-list">
                <header>
                    <h1>Salesman List</h1>
                    <div className="search-filter">
                        <input 
                            type="text" 
                            placeholder="Search by Name, Phone no..." 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="filter-sort" onClick={() => handleSort('fullname')}>
                            Sort by Name {sortField === 'fullname' && (sortOrder === 'asc' ? '↓' : '↑')}
                        </button>
                        <button className="filter-sort" onClick={() => handleSort('phonenumber')}>
                            Sort by Phone {sortField === 'phonenumber' && (sortOrder === 'asc' ? '↓' : '↑')}
                        </button>
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
                                    <th>Full Name</th>
                                    <th>Phone No</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalesmen.map((salesman) => (
                                    <tr key={salesman._id}>
                                        <td>{salesman.fullname}</td>
                                        <td>{salesman.phonenumber}</td>
                                        <td>{salesman.gender}</td>
                                        <td>{new Date(salesman.dob).toLocaleDateString()}</td>
                                        <td>{salesman.email}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={checkedState[salesman._id]}
                                                onChange={() => handleCheckboxChange(salesman._id)}
                                            />
                                            {checkedState[salesman._id] ? ' Confirmed' : ' Approval Pending'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <p>Showing {filteredSalesmen.length} of {salesmen.length} entries</p>
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

export default SalesmanList;
