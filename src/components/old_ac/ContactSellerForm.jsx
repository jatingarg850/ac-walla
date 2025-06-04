import React, { useState } from 'react';
import Button from '../commonComponents/button';

const ContactSellerForm = ({ listing, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        message: '',
        preferredContactTime: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/api/buyer-inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    acListingId: listing.id
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError(data.message || 'Failed to submit inquiry');
            }
        } catch (error) {
            console.error('Submit error:', error);
            setError('Failed to connect to server. Please try again later.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Contact Seller</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <h3>AC Details</h3>
                    <div className="ac-details">
                        <p><strong>Title:</strong> {listing.title}</p>
                        <p><strong>Brand:</strong> {listing.brand}</p>
                        <p><strong>Price:</strong> ₹{listing.price}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="success-message">
                                Inquiry submitted successfully! The seller will contact you soon.
                            </div>
                        )}

                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address *</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Preferred Contact Time</label>
                            <select
                                name="preferredContactTime"
                                value={formData.preferredContactTime}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select a time</option>
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                <option value="evening">Evening (4 PM - 7 PM)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Any specific questions or requirements?"
                            />
                        </div>

                        <div className="form-actions">
                            <Button text="Submit Inquiry" className="default-button" />
                            <Button text="Cancel" onClick={onClose} className="default-button-secondary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSellerForm; 