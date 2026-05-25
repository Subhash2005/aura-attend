import Swal from 'sweetalert2';
import React, { useState } from 'react';
import '../styles/join.css';
import API_BASE from '../config';

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/explore/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setSubmitted(true);
        Swal.fire("Message sent successfully to Subhash!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Server connection failed. Please try again.");
    }
  };

  return (
    <div className="join-container">
      <div className="join-card animate">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="section-heading">Join Our Team</h2>
        <p className="section-description">
          We are looking for passionate individuals to help us revolutionize attendance tracking with Aura Attend. 
          If you're a builder, a creator, or a visionary, we want to hear from you. Join us in building the future of seamless and intuitive digital solutions.
        </p>
        
        {!submitted ? (
          <form className="join-form" onSubmit={handleSubmit}>
            <h3 className="form-heading">Send Us a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        ) : (
          <div className="join-success" style={{ textAlign: 'center', padding: '2rem', color: '#1461cc', fontWeight: 600 }}>
            Message sent successfully! Subhash will get in touch with you shortly.
            <button className="submit-button" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>Send another message</button>
          </div>
        )}

        <div className="contact-details">
          <h3 className="contact-heading">Contact Directly</h3>
          <p>
            For a more direct conversation, you can reach us via email or phone.
          </p>
          <a href="mailto:subhash1422005s@gmail.com" className="contact-link">
            Email: subhash1422005s@gmail.com
          </a>
          <span className="contact-link">
            Phone: +91 7695903778
          </span>
        </div>
      </div>
    </div>
  );
};

export default Join;