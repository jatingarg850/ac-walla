import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.id) {
      fetchUserProfile();
      fetchUserListings();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const userData = response.data;
      setUserProfile(userData);
      setEditedProfile({
        username: userData.username || '',
        email: userData.email || '',
        address: userData.address || ''
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load profile data');
    }
  };

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ac-listings/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserListings(response.data);
    } catch (error) {
      console.error('Error fetching user listings:', error);
      setError('Failed to load AC listings');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user.id}`, 
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUserProfile(editedProfile);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderProfileSection = () => (
    <div className="profile-section">
      <div className="profile-header">
        <h2>Profile Information</h2>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="profile-form">
          <div className="form-group">
            <label>
              <FaUser className="input-icon" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editedProfile.username}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="input-icon" />
              Address
            </label>
            <textarea
              name="address"
              value={editedProfile.address}
              onChange={handleInputChange}
              className="form-control"
              rows="3"
            />
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <FaUser className="info-icon" />
            <div>
              <h3>Username</h3>
              <p>{userProfile?.username}</p>
            </div>
          </div>

          <div className="info-group">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>{userProfile?.email}</p>
            </div>
          </div>

          <div className="info-group">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Address</h3>
              <p>{userProfile?.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderListingsSection = () => (
    <div className="listings-section">
      <h2>My AC Listings</h2>
      {userListings.length === 0 ? (
        <div className="no-listings">
          <p>You haven't listed any ACs yet.</p>
        </div>
      ) : (
        <div className="ac-cards-container">
          {userListings.map((listing) => (
            <div key={listing.id} className="ac-card">
              <div className="ac-card__image-container">
                <img
                  src={listing?.photos && listing.photos.length > 0 
                    ? listing.photos[0] 
                    : "https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false"}
                  alt={listing?.title || "AC Image"}
                  className="ac-card__image"
                />
              </div>
              <div className="ac-card__content">
                <h3 className="ac-card__brand">{listing?.brand || "Brand"}</h3>
                <p className="ac-card__title">{listing?.title || "AC Model"}</p>
                <div className="ac-card__details">
                  <p className="ac-card__type">{listing?.ac_type || "Type N/A"}</p>
                  <p className="ac-card__year">{listing?.manufacturing_year || "Year N/A"}</p>
                </div>
                <div className="ac-card__price">
                  ₹{listing?.price?.toLocaleString() || "Price not available"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (!user) {
    return (
      <div className="profile-container">
        <div className="auth-error">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' ? renderProfileSection() : renderListingsSection()}
      </div>
    </div>
  );
};

export default Profile; 