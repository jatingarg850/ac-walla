import React from 'react';
import SubscriptionCardsMain from './cards';
import SubscriptionCards from './sideCards';

const Pricing = () => {
    return (
        <div>
            <br />
            <h1 className="subscription-heading">
                Our
                <span className='subscription-sub-heading'> Subscription Model</span>
            </h1>
            <div className='subscription-block'>
                <SubscriptionCards />
                <SubscriptionCardsMain />
                <SubscriptionCards />
            </div>
            <br />
        </div>
    );
}

export default Pricing;