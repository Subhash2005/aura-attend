import React, { useState } from 'react';
import { FaHeart, FaHandsHelping, FaDonate } from 'react-icons/fa';
import '../styles/donate.css';

const Donate = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleDonate = () => {
    // You would integrate your payment gateway logic here
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000); // Hide thank you message after 5 seconds
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <div className="donate-container">
      <div className="donate-card">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="donate-heading animate-fade-in">
          <FaHeart className="donate-icon" /> Help Us Make a Difference
        </h2>
        <p className="donate-slogan animate-fade-in-slow">
          Your kindness is a powerful force for change. Together, we can build a better future.
        </p>

        <div className="donation-tiers animate-fade-in-slower">
          <h3>Choose Your Impact</h3>
          <div className="tier-options">
            <button
              className={`tier-button ${selectedAmount === 10 ? 'active' : ''}`}
              onClick={() => handleAmountSelect(10)}
            >
              $10
            </button>
            <button
              className={`tier-button ${selectedAmount === 25 ? 'active' : ''}`}
              onClick={() => handleAmountSelect(25)}
            >
              $25
            </button>
            <button
              className={`tier-button ${selectedAmount === 50 ? 'active' : ''}`}
              onClick={() => handleAmountSelect(50)}
            >
              $50
            </button>
            <button
              className={`tier-button custom-amount ${selectedAmount === 'custom' ? 'active' : ''}`}
              onClick={() => handleAmountSelect('custom')}
            >
              Custom
            </button>
          </div>
        </div>

        {selectedAmount === 'custom' && (
          <div className="custom-input-group animate-fade-in">
            <label htmlFor="custom-amount">Enter Amount:</label>
            <input type="number" id="custom-amount" className="custom-input" />
          </div>
        )}

        <button className="donate-button" onClick={handleDonate}>
          <FaHandsHelping className="donate-button-icon" /> Donate Now
        </button>

        {showThankYou && (
          <p className="thank-you-message">
            Thank you for your generous contribution!
          </p>
        )}
      </div>
    </div>
  );
};

export default Donate;