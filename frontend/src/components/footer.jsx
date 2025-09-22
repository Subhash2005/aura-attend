import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section company-info">
          <h3>Your Company Name</h3>
          <p>We are a leading provider of innovative digital solutions, helping businesses streamline their operations and grow their online presence.</p>
        </div>

        <div className="footer-section links-info">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
          <p>Location: 123 Digital Ave, Tech City, 56789</p>
          <p>Phone: +1 (234) 567-8900</p>
        </div>

        <div className="footer-section social-info">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;