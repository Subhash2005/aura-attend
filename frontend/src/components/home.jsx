import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import img1 from "../assets/mainpage/img1.png"; // Left
import img2 from "../assets/mainpage/img2.png"; // Middle
import img3 from "../assets/mainpage/img3.png"; // Right



function EllipseText() {

  return (
    <div>
<div className="row px-4 align-items-center">
  <div class="col d-flex justify-content-start ms-3">
  <div class="hover-container">
    <button class="explore px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition">
      Explore
    </button>
    <div class="sliding-window">
<Link to="/join" className="sliding-item">Join us</Link>
<Link to="/suggestion" className="sliding-item">Add Suggestion</Link>
<Link to="/organization" className="sliding-item">Organization</Link>
<Link to="/spons" className="sliding-item">Sponsors</Link>
<Link to="/services" className="sliding-item">Services</Link>
<Link to="/documentation" className="sliding-item">Documentation</Link>
    </div>
  </div>
</div>

    <div className="ellipse  shadow-lg text-center">
      <h1 className="title text-4xl font-bold text-white">Aura-Attend</h1>
      <p className="slogan text-lg mt-2 text-white">
        Digital Marketplace - Buy & Sell Anything Seamlessly
      </p>
    </div>

  <div className="col d-flex justify-content-end me-3">
    <div class="hover-container">
    <button class="explore px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition">
      membership
    </button>
    <div class="sliding-window">
<Link to="/Register" className="sliding-item">Register</Link>
      <a href="/login" class="sliding-item">Login</a>

    </div>
  </div>
  </div>

</div>


      {/* Image Cards Section */}
      <div className="centered-container">
        <div>
          <div className="cards-fan-container">
            {/* Card 1 (Back/Left) */}
            <div className="card-item card-left">
              <img src={img1} alt="Card 1" className="img-fluid rounded shadow" />
            </div>

            {/* Card 2 (Middle) */}
            <div className="card-item card-middle">
              <img src={img2} alt="Card 2" className="img-fluid rounded shadow" />
            </div>

            {/* Card 3 (Front/Right) */}
            <div className="card-item card-right">
              <img src={img3} alt="Card 3" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Glass Card Section */}
      <div className="card-container">
        <div className="glass-card">
          <div className="content">
            <div className="card-header">
              <img src={img2} alt="Platform Logo" className="img3" />
              <h2 className="title">Effortless Attendance</h2>
            </div>
            <p className="description">
              Streamline your organization's attendance with Aura Attend. Our intuitive platform simplifies
              tracking, reporting, and managing employee presence, giving you real-time insights and unparalleled
              control.
            </p>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EllipseText;
