import React from 'react';

export default function AcList({ listing }) {
    const defaultImage = "https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false";

    return (
        <div className='ac-list'>
            <img 
                src={listing?.photos && listing.photos.length > 0 ? listing.photos[0] : defaultImage}
                alt={listing?.title || "AC Image"}
                className="ac-image"
            />
            <h2 className='ac-list__title'>
                <span className='brand-name'>
                    {listing?.brand || "Brand"}
                </span> 
                {listing?.title || "AC Model"}
            </h2>
            <p className='ac-list__price'>
                ₹{listing?.price?.toLocaleString() || "Price not available"}
            </p>
        </div>
    );
}