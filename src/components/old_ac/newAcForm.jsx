import React, { useState } from 'react';
import '../../../src/index.css';
import Button from "../commonComponents/button";

const ACListingForm = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        brand: '',
        manufacturingYear: '',
        acType: '',
        dimensions: '',
        noOfAC: '',
        price: '',
        photos: [] // Store photo objects here
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const acBrands = [
        'Voltas',
        'Hitachi',
        'O General',
        'Carrier',
        'Daikin',
        'LG',
        'Samsung',
        'Whirlpool',
        'Blue Star',
        'Panasonic'
    ];

    const acTypes = [
        'Split AC',
        'Window AC'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePhotoChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Convert file to base64
                const base64 = await convertToBase64(file);
                const updatedPhotos = [...formData.photos];
                updatedPhotos[index] = base64;
                setFormData({
                    ...formData,
                    photos: updatedPhotos
                });
            } catch (error) {
                console.error('Error converting image:', error);
                setError('Failed to process image. Please try again.');
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const addPhotoField = () => {
        if (formData.photos.length < 5) {
            setFormData({
                ...formData,
                photos: [...formData.photos, null] // Add a placeholder for the new photo
            });
        }
    };

    const handleOwnerSelection = (owner) => {
        setFormData({
            ...formData,
            noOfAC: owner
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validate noOfAC is selected
        if (!formData.noOfAC) {
            setError('Please select number of ACs');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to list your AC');
                return;
            }

            // Filter out any null or empty photos
            const validPhotos = formData.photos.filter(photo => photo !== null && photo !== '');

            const response = await fetch('http://localhost:5000/api/ac-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description || '',
                    brand: formData.brand,
                    manufacturing_year: parseInt(formData.manufacturingYear),
                    ac_type: formData.acType,
                    dimensions: formData.dimensions || '',
                    no_of_ac: parseInt(formData.noOfAC),
                    price: parseFloat(formData.price),
                    photos: validPhotos
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                // Clear form
                setFormData({
                    title: '',
                    description: '',
                    brand: '',
                    manufacturingYear: '',
                    acType: '',
                    dimensions: '',
                    noOfAC: '',
                    price: '',
                    photos: []
                });
                // Call onSubmitSuccess to refresh listings
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            } else {
                setError(data.message || 'Failed to submit AC listing');
            }
        } catch (error) {
            console.error('Submit error:', error);
            setError('Failed to connect to server. Please try again later.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
                        AC listed successfully!
                    </div>
                )}
                {/* Title */}
                <div className="form-group">
                    <label className="form-label">Write Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Write Heading Here"
                        className="form-control"
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="form-label">Write Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write Description Here"
                        className="form-control form-textarea"
                        required
                    />
                </div>

                <div className="grid-container">
                    {/* Brand Selection */}
                    <div className="form-group">
                        <label className="form-label">Select Brand</label>
                        <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="select-dropdown"
                            required
                        >
                            <option value="">Select your AC Brand</option>
                            {acBrands.map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>

                    {/* Manufacturing Year */}
                    <div className="form-group">
                        <label className="form-label">Enter Manufacturing Year</label>
                        <input
                            type="number"
                            name="manufacturingYear"
                            value={formData.manufacturingYear}
                            onChange={handleChange}
                            placeholder="Enter year"
                            className="form-control"
                            min="1990"
                            max={new Date().getFullYear()}
                            required
                        />
                    </div>
                </div>

                <div className="grid-container">
                    {/* AC Type Selection */}
                    <div className="form-group">
                        <label className="form-label">Select Type</label>
                        <select
                            name="acType"
                            value={formData.acType}
                            onChange={handleChange}
                            className="select-dropdown"
                            required
                        >
                            <option value="">Select your AC Type</option>
                            {acTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dimensions */}
                    <div className="form-group">
                        <label className="form-label">Enter Dimensions</label>
                        <input
                            type="text"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleChange}
                            placeholder="Enter Dimensions of your AC"
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                {/* Number of Owners */}
                <div className="form-group">
                    <label className="form-label">No. of AC (Select One Of Them):</label>
                    <div className="owner-buttons">
                        {['1', '2', '3', '4', '4+'].map((owner) => (
                            <button
                                key={owner}
                                type="button"
                                onClick={() => handleOwnerSelection(owner)}
                                className={`owner-button ${formData.noOfAC === owner ? 'owner-button-selected' : ''}`}
                            >
                                {owner}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="form-group">
                    <label className="form-label">Set A Price</label>
                    <div className="price-input-container">
                        <span className="price-symbol">₹</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0"
                            className={`form-control price-input ${formData.price ? 'filled' : ''}`}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                {/* Photos */}
                <div className="form-group">
                    <label className="form-label">Add Up to 5 Photos of Your AC</label>
                    <div className="photos-container">
                        {formData.photos.map((photo, index) => (
                            <div key={index} className="photo-box">
                                {photo && (
                                    <img
                                        src={photo}
                                        alt={`Preview ${index + 1}`}
                                        className="photo-preview"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input-hidden"
                                    id={`photo-${index}`}
                                    onChange={(e) => handlePhotoChange(e, index)}
                                />
                                <label htmlFor={`photo-${index}`}>Select</label>
                            </div>
                        ))}
                        {formData.photos.length < 5 && (
                            <button
                                type="button"
                                onClick={addPhotoField}
                                className="add-photo-box"
                            >
                                + Add
                            </button>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <Button text="Add your AC" className="default-button" />
                </div>
            </form>
        </div>
    );
};

export default ACListingForm;