import React, { useState } from "react";
import Button from "../commonComponents/button";
import ContactSellerForm from "./ContactSellerForm";

const ACDetailCard = ({ listing, isOwner }) => {
    const [showContactForm, setShowContactForm] = useState(false);

    if (!listing) return null;

    const defaultImage = "https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false";

    return (
        <>
            <div className="product-detail-card-container">
                <div className="product-detail-product-image">
                    <img 
                        src={listing.photos && listing.photos.length > 0 ? listing.photos[0] : defaultImage} 
                        alt={listing.title} 
                    />
                </div>

                <div className="product-detail-product-info">
                    <div className="product-detail-product-title">
                        <h2>{listing.title}</h2>
                    </div>

                    {!isOwner && (
                        <div className="product-detail-actions">
                            <Button 
                                text="Contact Seller" 
                                className="default-button"
                                onClick={() => setShowContactForm(true)}
                            />
                        </div>
                    )}
                </div>

                <div className="product-detail-price-info">
                    <div>
                        <span className="product-detail-price-tag">₹{listing.price}</span>
                    </div>
                </div>

                <ul className="product-detail-product-specs">
                    <li><span className="product-detail-spec-label">Brand:</span> {listing.brand}</li>
                    <li><span className="product-detail-spec-label">Type:</span> {listing.ac_type}</li>
                    <li><span className="product-detail-spec-label">Manufacturing Year:</span> {listing.manufacturing_year}</li>
                    {listing.dimensions && (
                        <li><span className="product-detail-spec-label">Dimensions:</span> {listing.dimensions}</li>
                    )}
                    <li><span className="product-detail-spec-label">Number of ACs:</span> {listing.no_of_ac}</li>
                </ul>

                {listing.description && (
                    <div className="product-detail-about-section">
                        <h3>Description</h3>
                        <p>{listing.description}</p>
                    </div>
                )}

                {isOwner && (
                    <div className="product-detail-actions" style={{ marginTop: '1rem' }}>
                        <Button text="Edit" className="default-button" />
                        <Button text="Delete" className="default-button-danger" />
                    </div>
                )}
            </div>

            {showContactForm && (
                <ContactSellerForm 
                    listing={listing}
                    onClose={() => setShowContactForm(false)}
                />
            )}
        </>
    );
};

export default ACDetailCard;