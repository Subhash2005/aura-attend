import React from 'react';
import '../styles/suggestion.css';

const Suggestion = () => {
  return (
    <div className="suggestion-container">
      <div className="suggestion-card animate">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="section-heading">Share Your Suggestions</h2>
        <p className="section-description">
          Your feedback is vital to our project's success. Please use the form below to share your ideas, comments, or suggestions. We're listening!
        </p>
        
        <form className="suggestion-form">
          <div className="form-group">
            <label htmlFor="name">Full Name (Optional)</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address (Optional)</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="suggestion">Your Suggestion</label>
            <textarea id="suggestion" name="suggestion" rows="7" required></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Suggestion</button>
        </form>
      </div>
    </div>
  );
};

export default Suggestion;