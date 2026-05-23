import React, { useState } from 'react';
import '../styles/suggestion.css';
import API_BASE from '../config';

const Suggestion = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/explore/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, suggestion })
      });

      if (res.ok) {
        setSubmitted(true);
        alert("Thank you! Your suggestion has been recorded.");
        setName("");
        setEmail("");
        setSuggestion("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed. Please try again.");
    }
  };

  return (
    <div className="suggestion-container">
      <div className="suggestion-card animate">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="section-heading">Share Your Suggestions</h2>
        <p className="section-description">
          Your feedback is vital to our project's success. Please use the form below to share your ideas, comments, or suggestions. We're listening!
        </p>
        
        {!submitted ? (
          <form className="suggestion-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name (Optional)</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address (Optional)</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="suggestion">Your Suggestion</label>
              <textarea 
                id="suggestion" 
                name="suggestion" 
                rows="7" 
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Submit Suggestion</button>
          </form>
        ) : (
          <div className="suggestion-success" style={{ textAlign: 'center', padding: '2rem', color: '#1461cc', fontWeight: 600 }}>
            Thank you for your valuable feedback!
            <button className="submit-button" style={{ marginTop: '1.5rem', display: 'block', margin: '1.5rem auto 0 auto' }} onClick={() => setSubmitted(false)}>Send another suggestion</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestion;