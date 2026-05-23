import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-container">
        <div className="footer-section company-info">
          <h3>Aura Attend</h3>
          <p>We are a leading provider of innovative digital solutions, helping businesses, colleges, and schools streamline their operations and manage presence seamlessly.</p>
        </div>

        <div className="footer-section links-info">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/documentation">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><a href="mailto:subhash1422005s@gmail.com">Contact Subhash</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:subhash1422005s@gmail.com">subhash1422005s@gmail.com</a></p>
          <p>Location: Tamil Nadu, India</p>
          <p>Phone: +91 7695903778</p>
        </div>

        <div className="footer-section social-info">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://www.linkedin.com/in/subhash-s-63369a257/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/i_am_subhash_s" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Aura Attend. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;