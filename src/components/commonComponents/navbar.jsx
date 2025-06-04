import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../../src/index.css';
import Button from './button';
import { Logo } from "../../assets/assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on left */}
        <div className="logo-container" style={{ cursor: 'pointer' }}>
          <NavLink to="/">
            <img src={Logo} alt="AC Wallah Logo" className="logo" />
          </NavLink>
        </div>

        {/* Right side navigation and auth */}
        <div className="nav-right">
          {/* Desktop Navigation */}
          <div className="nav-links">
            <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/old_ac" className="nav-link" activeClassName="active">AC Listing</NavLink>
            <NavLink to="/pricing" className="nav-link" activeClassName="active">Pricing</NavLink>
            <NavLink to="/about" className="nav-link" activeClassName="active">About Us</NavLink>
          </div>
          
          {user && (
            <>
              <button className="refer-button">Refer Someone</button>
              <Button 
                text="Profile" 
                className="default-button" 
                onClick={handleProfileClick} 
              />
            </>
          )}

          {/* Login/Signup/Logout Button */}
          <div className="auth-button">
            <Button 
              text={user ? "Logout" : "Login / Signup"} 
              className="default-button" 
              onClick={handleAuthClick} 
            />
          </div>
        </div>

        {/* Mobile Menu Button - only visible on small screens */}
        <div className="mobile-menu-button">
          <button onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" className="mobile-nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/old_ac" className="mobile-nav-link" activeClassName="active">AC Listing</NavLink>
          <NavLink to="/pricing" className="mobile-nav-link" activeClassName="active">Pricing</NavLink>
          <NavLink to="/about" className="mobile-nav-link" activeClassName="active">About Us</NavLink>
          {user && (
            <>
              <button className="refer-button">Refer Someone</button>
              <button className="mobile-nav-link" onClick={handleProfileClick}>Profile</button>
            </>
          )}
          <button 
            className="mobile-login-button"
            onClick={handleAuthClick}
          >
            {user ? "Logout" : "Login / Signup"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;