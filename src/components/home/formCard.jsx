import React, { useState } from 'react';
import Button from '../commonComponents/button';
import axios from 'axios';
import config from '../../config/config';

const FormCard = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        service: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(`${config.apiBaseUrl}/service-requests`, {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                service_type: formData.service,
                address: formData.address,
                preferred_date: new Date().toISOString(),
                message: '',
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                // Clear form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    service: '',
                });
            }
        } catch (error) {
            console.error('Submit error:', error);
            setError('Failed to submit form. Please try again.');
        }
    };

    return (
        <div className="form-card" id="service-form">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
                        Service request submitted successfully!
                    </div>
                )}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name<span>*</span></label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Eg: Rohan Singh"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email ID<span>*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Eg: rohansingh12@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number<span>*</span></label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+91 93xxxx xxxx"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Choose Service<span>*</span></label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Eg: AC Cleaning</option>
                            <option value="AC Cleaning">AC Cleaning</option>
                            <option value="AC Repair">AC Repair</option>
                            <option value="AC Installation">AC Installation</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Location/Address<span>*</span></label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Hno.2 ABC Colony, Delhi"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-submit">
                    <Button text="Book Now" className="default-button" />
                </div>
            </form>
        </div>
    );
};

export default FormCard;