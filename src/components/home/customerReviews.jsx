import React from 'react';
import Button from '../commonComponents/button'; // Fixed the path to button component
import '../../../src/index.css'; // Fixed the path to index.css

export default function CustomerReviews() {
    return (
        <div className="reviews-section">
            <div className="reviews-header">
                <div className="reviews-navigation">
                    <Button text="<" className="default-button" />
                    <Button text=">" className="default-button" />
                </div>
                <h2 className="reviews-title">
                    <span className="reviews-title__line">What Are Happy <span className="highlight">Customers</span></span>
                    <span className="reviews-title__line">Saying !!</span>
                </h2>
                <p className="reviews-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque sapien et velit aliquam, sit amet suscipit est efficitur.
                </p>
            </div>
            <div className="review-card">
                <img
                    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    alt="Customer"
                    className="review-card__image"
                />
                <div className="review-card__content">
                    <h3 className="review-card__name">Pranav Kumar</h3>
                    <p className="review-card__rating">⭐⭐⭐⭐☆</p>
                    <blockquote className="review-card__quote">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque sapien et velit aliquam, sit amet suscipit est."
                    </blockquote>
                </div>
            </div>
        </div>
    );
}