import React from 'react';
import '../styles/join.css';

const Join = () => {
  return (
    <div className="join-container">
      <div className="join-card animate">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="section-heading">Join Our Team</h2>
        <p className="section-description">
          We are looking for passionate individuals to help us revolutionize attendance tracking with Aura Attend. 
          If you're a builder, a creator, or a visionary, we want to hear from you. Join us in building the future of seamless and intuitive digital solutions.
        </p>
        
        <form className="join-form">
          <h3 className="form-heading">Send Us a Message</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>

        <div className="contact-details">
          <h3 className="contact-heading">Contact Directly</h3>
          <p>
            For a more direct conversation, you can reach us via email or phone.
          </p>
          <a href="mailto:join@auraattend.com" className="contact-link">
            Email: join@auraattend.com
          </a>
          <span className="contact-link">
            Phone: +1 (123) 456-7890
          </span>
        </div>
      </div>
    </div>
  );
};

export default Join;