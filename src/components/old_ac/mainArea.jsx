import React, { useState, useEffect } from 'react';
import ACDetailCard from './acDetailCard';
import NewAcForm from './newAcForm';
import '../../../src/index.css';

const MainArea = () => {
    const [activeTab, setActiveTab] = useState('listedAC');
    const [listings, setListings] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [error, setError] = useState('');

    // Fetch all AC listings
    const fetchListings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ac-listings');
            const data = await response.json();
            if (response.ok) {
                setListings(data);
            } else {
                setError('Failed to fetch AC listings');
            }
        } catch (error) {
            console.error('Fetch listings error:', error);
            setError('Failed to connect to server');
        }
    };

    // Fetch user's AC listings
    const fetchMyListings = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/user/ac-listings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMyListings(data);
            } else {
                setError('Failed to fetch your AC listings');
            }
        } catch (error) {
            console.error('Fetch my listings error:', error);
            setError('Failed to connect to server');
        }
    };

    // Fetch data when component mounts or when activeTab changes
    useEffect(() => {
        if (activeTab === 'listedAC') {
            fetchListings();
        } else if (activeTab === 'myListedAC') {
            fetchMyListings();
        }
    }, [activeTab]);

    return (
        <div className="old-ac-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div
                    className={`sidebar-item ${activeTab === 'listedAC' ? 'active' : ''}`}
                    onClick={() => setActiveTab('listedAC')}
                >
                    Listed ACs
                </div>
                <div
                    className={`sidebar-item ${activeTab === 'myListedAC' ? 'active' : ''}`}
                    onClick={() => setActiveTab('myListedAC')}
                >
                    My Listed ACs
                </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
                
                {activeTab === 'listedAC' && (
                    <div>
                        {listings.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                No AC listings available
                            </div>
                        ) : (
                            listings.map(listing => (
                                <ACDetailCard key={listing.id} listing={listing} />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'myListedAC' && (
                    <div>
                        <NewAcForm onSubmitSuccess={fetchMyListings} />
                        <div style={{ marginTop: '2rem' }}>
                            <h2>Your Listed ACs</h2>
                            {myListings.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    You haven't listed any ACs yet
                                </div>
                            ) : (
                                myListings.map(listing => (
                                    <ACDetailCard key={listing.id} listing={listing} isOwner={true} />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainArea;