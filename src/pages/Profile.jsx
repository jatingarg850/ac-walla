import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaGlobe, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        await Promise.all([fetchUserProfile(), fetchUserListings()]);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          navigate('/login');
        } else {
          setError('Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, logout]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const userData = response.data;
      setUserProfile(userData);
      setEditedProfile({
        username: userData.username || '',
        email: userData.email || '',
        phone_number: userData.phone_number || '',
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || ''
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const fetchUserListings = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/api/ac-listings/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUserListings(response.data);
    } catch (error) {
      console.error('Error fetching user listings:', error);
      throw error;
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setError('');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.id}`, 
        editedProfile,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setUserProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to update profile');
      }
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
              <FaPhone className="input-icon" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={editedProfile.phone_number}
              onChange={handleInputChange}
              className="form-control"
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

          <div className="form-group">
            <label>
              <FaCity className="input-icon" />
              City
            </label>
            <input
              type="text"
              name="city"
              value={editedProfile.city}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>
              <FaGlobe className="input-icon" />
              State
            </label>
            <input
              type="text"
              name="state"
              value={editedProfile.state}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>
              <FaGlobe className="input-icon" />
              Country
            </label>
            <input
              type="text"
              name="country"
              value={editedProfile.country}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <FaUser className="info-icon" />
            <div className="info-content">
              <label>Username</label>
              <p>{userProfile?.username}</p>
            </div>
          </div>

          <div className="info-group">
            <FaEnvelope className="info-icon" />
            <div className="info-content">
              <label>Email</label>
              <p>{userProfile?.email}</p>
            </div>
          </div>

          <div className="info-group">
            <FaPhone className="info-icon" />
            <div className="info-content">
              <label>Phone Number</label>
              <p>{userProfile?.phone_number || 'Not provided'}</p>
            </div>
          </div>

          <div className="info-group">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-content">
              <label>Address</label>
              <p>{userProfile?.address || 'Not provided'}</p>
            </div>
          </div>

          <div className="info-group">
            <FaCity className="info-icon" />
            <div className="info-content">
              <label>City</label>
              <p>{userProfile?.city || 'Not provided'}</p>
            </div>
          </div>

          <div className="info-group">
            <FaGlobe className="info-icon" />
            <div className="info-content">
              <label>State</label>
              <p>{userProfile?.state || 'Not provided'}</p>
            </div>
          </div>

          <div className="info-group">
            <FaGlobe className="info-icon" />
            <div className="info-content">
              <label>Country</label>
              <p>{userProfile?.country || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderListingsSection = () => (
    <div className="listings-section">
      <div className="listings-header">
        <h2>My AC Listings</h2>
        <button 
          className="add-listing-button"
          onClick={() => navigate('/old_ac')}
        >
          Add New Listing
        </button>
      </div>

      {userListings.length === 0 ? (
        <div className="no-listings">
          <p>You haven't listed any ACs yet.</p>
          <button 
            className="start-selling-button"
            onClick={() => navigate('/old_ac')}
          >
            Start Selling
          </button>
        </div>
      ) : (
        <div className="ac-cards-container">
          {userListings.map((listing) => (
            <div 
              key={listing.id} 
              className="ac-card"
              onClick={() => navigate(`/ac-listing/${listing.id}`)}
            >
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
                <div className="ac-card__status">
                  Status: {listing?.status || "Active"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

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