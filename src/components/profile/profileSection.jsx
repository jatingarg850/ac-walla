import React, { useState } from 'react';
import Button from '../commonComponents/button'; // Import the Button component
import '../../../src/index.css'; // Import the CSS file

const ProfileSection = () => {
    const [profileData, setProfileData] = useState({
        name: 'Prateek Singh',
        email: 'prateeksingh12@gmail.com',
        phone: '+91 93546 12345',
    });

    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        phone: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    const toggleEdit = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: !editableFields[field],
        });
    };

    const handleSaveChanges = () => {
        console.log('Profile Data Saved:', profileData);
        alert('Profile changes saved successfully!');
        setEditableFields({
            name: false,
            email: false,
            phone: false,
        });
    };

    return (
        <div className="profile-container">
            <form className="profile-form">
                {/* Name Field */}
                <div className="form-group">
                    <label className="form-label">
                        Your Name
                        {/* <span
                            className="edit-icon"
                            onClick={() => toggleEdit('name')}
                        >
                            ✏️
                        </span> */}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Name Here"
                        disabled={!editableFields.name} // Disable input if not editable
                    />
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label className="form-label">
                        Email ID
                        {/* <span
                            className="edit-icon"
                            onClick={() => toggleEdit('email')}
                        >
                            ✏️
                        </span> */}
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Email Here"
                        disabled={!editableFields.email} // Disable input if not editable
                    />
                </div>

                {/* Phone Number Field */}
                <div className="form-group">
                    <label className="form-label">
                        Your Number
                        {/* <span
                            className="edit-icon"
                            onClick={() => toggleEdit('phone')}
                        >
                            ✏️
                        </span> */}
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        placeholder="Enter Number Here"
                        className="form-control"
                        disabled={!editableFields.phone} // Disable input if not editable
                    />
                </div>

                {/* Save Changes Button */}
                <Button text="Save Changes" className="default-button" onClick={handleSaveChanges} />
            </form>
        </div>
    );
};

export default ProfileSection;