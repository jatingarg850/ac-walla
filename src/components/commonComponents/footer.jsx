import React from "react";
import { Logo } from "../../assets/assets"; // Import the logo from assets.jsx

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">Company</h3>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Home</a></li>
                        <li className="footer-description">
                            Description - where cutting-edge technology meets visionary design. Transform your digital presence with our expert team.
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Follow Us</h3>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Facebook</a></li>
                        <li><a href="#" className="footer-link">Instagram</a></li>
                        <li><a href="#" className="footer-link">Twitter</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Contact</h3>
                    <ul className="footer-details">
                        <li>Gr Flr, Sheetal Apt, J C Road, Baman Wada, Vile Parle, (east) Mumbai, Maharashtra, 400099, India</li>
                        <li>Call us at +91 945xx xxxxx</li>
                        <li>Mail us at noagency@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-logo">
                    <img src={Logo} alt="Logo" /> {/* Use the imported logo */}
                </div>
                <p className="footer-copyright">
                    Copyright © 2024 Brand Name | All Rights Reserved
                </p>
            </div>
        </footer>
    );
}