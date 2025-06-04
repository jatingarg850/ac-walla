import React, { useState } from 'react';
import Button from '../commonComponents/button';

export default function Services() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleBookNow = () => {
        const formElement = document.getElementById('service-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className={`service-card ${isExpanded ? 'expanded' : ''}`}>
                <img
                    src='https://www.onehourairftworth.com/wp-content/uploads/2018/03/Why-Heating-and-AC-Should-Be-Left-to-a-Professional-Fort-Worth-TX-1024x600.jpg'
                    alt="AC Repair"
                    className="service-card__image"
                />
                <div className="service-card__content">
                    <div className="service-card__header">
                        <div>
                            <h2 className="service-card__title">AC Repair</h2>
                            <p className="service-card__price">Starts from ₹800</p>
                        </div>
                        <Button text="Book Now" className="default-button" onClick={handleBookNow} />
                    </div>
                    <ul className="service-card__details">
                        <li>Pre Job Inspection: Comprehensive AC Diagnosis</li>
                        <li>Installation of both indoor and outdoor units</li>
                        <li>Post Job Inspection: Thorough checks of gas levels</li>
                        <li>30 Days ACWallah Warranty</li>
                    </ul>
                    
                    {isExpanded && (
                        <div className="service-card__expanded-content">
                            <h3>Detailed Service Information</h3>
                            <div className="service-card__section">
                                <h4>What's Included</h4>
                                <ul>
                                    <li>Complete system diagnostic and performance check</li>
                                    <li>Cleaning of indoor and outdoor units</li>
                                    <li>Refrigerant level check and top-up (if needed)</li>
                                    <li>Electrical connections inspection and tightening</li>
                                    <li>Air filter cleaning or replacement</li>
                                    <li>Drain line inspection and cleaning</li>
                                </ul>
                            </div>
                            
                            <div className="service-card__section">
                                <h4>Additional Benefits</h4>
                                <ul>
                                    <li>24/7 Emergency Support</li>
                                    <li>Experienced and Certified Technicians</li>
                                    <li>Genuine Spare Parts</li>
                                    <li>Transparent Pricing</li>
                                    <li>Service Warranty</li>
                                </ul>
                            </div>

                            <div className="service-card__section">
                                <h4>Service Process</h4>
                                <ol>
                                    <li>Book an appointment through our platform</li>
                                    <li>Expert technician visits at scheduled time</li>
                                    <li>Thorough inspection and diagnosis</li>
                                    <li>Service execution with quality parts</li>
                                    <li>Post-service testing and cleanup</li>
                                    <li>Service report and warranty card</li>
                                </ol>
                            </div>
                        </div>
                    )}
                    
                    <div className="service-card__actions">
                        <button 
                            onClick={toggleExpand} 
                            className="service-card__link"
                        >
                            {isExpanded ? 'Show Less' : 'Read More'} {isExpanded ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}