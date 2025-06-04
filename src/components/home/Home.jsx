import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/index.css'; // Corrected the path to index.css
import Services from './services'; // Fixed the spelling of 'sevices'
import CustomerReviews from './customerReviews'; // Verified the path
import Button from '../commonComponents/button';
import FormCard from './formCard';
import CommonCard from './commonCard';
import axios from 'axios';

const Main = () => {
    const [oldAcListings, setOldAcListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOldAcListings();
    }, []);

    const fetchOldAcListings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ac-listings');
            setOldAcListings(response.data);
        } catch (error) {
            console.error('Error fetching old AC listings:', error);
        }
    };

    const handleSellNowClick = () => {
        navigate('/old_ac');
    };

    const handleSeeAllClick = () => {
        navigate('/old_ac');
    };

    return (
        <>
            <br />
            <FormCard />
            <br />
            <h1 className="service-heading">
                Our
                <span className='sub-heading'> Services</span>
            </h1>
            <div className='services-block'>
                <Services />
                <Services />
                <Services />
                <Services />
            </div>
            <br />
            <h1 className="service-heading">
                Old Listed
                <span className='sub-heading'> AC</span>
            </h1>
            <div className='ac-cards-container'>
                {oldAcListings.slice(0, 5).map((listing) => (
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
                        </div>
                    </div>
                ))}
            </div>
            <div className='button-container'>
                <CommonCard
                    title="Want to Sell Your AC?"
                    desc="List your AC for sale and reach potential buyers"
                    buttonText="Sell Now"
                    onButtonClick={handleSellNowClick}
                />
                <CommonCard
                    title="Looking for Old ACs?"
                    desc="Browse through our collection of listed ACs"
                    buttonText="See All"
                    onButtonClick={handleSeeAllClick}
                />
            </div>
            <br />
            <CustomerReviews />
            <br />
            <CommonCard
                title="Refer a friend and Get flat 20% off on any of the services!"
                desc="Earn rewards effortlessly! Refer a friend to list their AC with us and both of you get exclusive benefits. Fast, easy, and rewarding."
                buttonText="Refer Now"
            />
            <br />
        </>
    );
};

export default Main;