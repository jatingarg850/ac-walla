import { vipImage } from "../../assets/assets";

export default function HeroSection() {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Your Complete AC Solution:
                        <span className="highlight">Buy, Sell, Repair, <span className='other-text'>All in One Place.</span> </span>
                    </h1>
                </div>

                <div className="service-icons">
                    <div className="service-item">
                        <div className="icon-container">
                            <span className="service-icon">🔧</span>
                        </div>
                        <span className="service-name">AC Service</span>
                    </div>

                    <div className="service-item">
                        <div className="icon-container">
                            <span className="service-icon">🧪</span>
                        </div>
                        <span className="service-name">AC Gas Charging</span>
                    </div>

                    <div className="service-item">
                        <div className="icon-container">
                            <span className="service-icon">🔨</span>
                        </div>
                        <span className="service-name">AC Repair</span>
                    </div>

                    <div className="service-item">
                        <div className="icon-container">
                            <span className="service-icon">🔌</span>
                        </div>
                        <span className="service-name">AC Installation</span>
                    </div>
                </div>
            </div>

            <a href="#" className="card">
                <img src={vipImage} alt="VIP Membership" className="card__img" />
                <div className="card__footer">
                    <div className="card__footer-content">
                        <span className="membership-title">VIP Membership</span>
                        <span className="membership-desc">Upto 15% off on top of existing Products</span>
                    </div>
                    <button className="card__button">Buy now</button>
                </div>
                <span className="card__action">
                    <svg viewBox="0 0 448 512" title="play">
                        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                    </svg>
                </span>
            </a>
        </div>
    )
}