import React, { useState } from 'react';
import '../styles/spons.css';

const sponsorsData = [
  { id: 1, name: 'Innovate Solutions', logo: 'https://placehold.co/150x150/d4ff00/000000?text=S1', description: 'Driving the future of tech.', details: 'Innovate Solutions is a leader in cloud computing and AI-driven platforms, providing next-generation solutions for startups.' },
  { id: 2, name: 'Global Ventures', logo: 'https://placehold.co/150x150/004d40/ffffff?text=S2', description: 'Investing in tomorrow\'s leaders.', details: 'Global Ventures is a venture capital firm that invests in early-stage technology companies with high growth potential.' },
  { id: 3, name: 'Creative Minds Co.', logo: 'https://placehold.co/150x150/ff5722/ffffff?text=S3', description: 'Powering creativity and design.', details: 'Creative Minds Co. specializes in branding and marketing, helping businesses build a unique and memorable identity.' },
  { id: 4, name: 'Local Business Hub', logo: 'https://placehold.co/150x150/000000/d4ff00?text=S4', description: 'Supporting local communities.', details: 'The Local Business Hub is a non-profit organization dedicated to supporting small businesses within the community through resources and mentorship.' },
  { id: 5, name: 'Quantum Analytics', logo: 'https://placehold.co/150x150/ffffff/004d40?text=S5', description: 'Unlocking data potential.', details: 'Quantum Analytics provides advanced data science and business intelligence services to help companies make informed decisions.' },
  { id: 6, name: 'Digital Forge', logo: 'https://placehold.co/150x150/000000/ff5722?text=S6', description: 'Building the digital world.', details: 'Digital Forge is a software development company that creates custom applications and enterprise-level software.' },
  { id: 7, name: 'Eco-Solutions', logo: 'https://placehold.co/150x150/004d40/d4ff00?text=S7', description: 'Sustainable technology.', details: 'Eco-Solutions is committed to creating environmentally friendly technology and promoting sustainability.' },
  { id: 8, name: 'Peak Performance', logo: 'https://placehold.co/150x150/ff5722/004d40?text=S8', description: 'Excellence in every field.', details: 'Peak Performance offers professional development and team-building workshops to enhance corporate efficiency.' },
  { id: 9, name: 'Data Harbor', logo: 'https://placehold.co/150x150/d4ff00/004d40?text=S9', description: 'Secure data, smart future.', details: 'Data Harbor provides secure data storage and cybersecurity solutions for businesses of all sizes.' },
  { id: 10, name: 'Infinite Labs', logo: 'https://placehold.co/150x150/ffffff/ff5722?text=S10', description: 'Innovating beyond limits.', details: 'Infinite Labs is a research and development company at the forefront of technological innovation.' },
  { id: 11, name: 'Urban Designs', logo: 'https://placehold.co/150x150/004d40/d4ff00?text=S11', description: 'Crafting urban spaces.', details: 'Urban Designs is an architecture and urban planning firm dedicated to creating modern and sustainable cityscapes.' },
  { id: 12, name: 'NextGen Systems', logo: 'https://placehold.co/150x150/ff5722/ffffff?text=S12', description: 'The future of IT.', details: 'NextGen Systems provides cutting-edge IT infrastructure and support services to a wide range of industries.' },
  { id: 13, name: 'Zenith Group', logo: 'https://placehold.co/150x150/ffffff/004d40?text=S13', description: 'Reaching new heights.', details: 'Zenith Group is a consulting firm that helps businesses achieve their strategic goals and operational excellence.' },
  { id: 14, name: 'Pioneer Consulting', logo: 'https://placehold.co/150x150/d4ff00/ff5722?text=S14', description: 'Guiding you to success.', details: 'Pioneer Consulting offers expert advice and solutions in management, marketing, and finance.' },
  { id: 15, name: 'Apex Solutions', logo: 'https://placehold.co/150x150/004d40/d4ff00?text=S15', description: 'At the top of the game.', details: 'Apex Solutions is a leading provider of enterprise software, known for its scalable and reliable products.' },
];

const Spons = () => {
  const [showAllSponsors, setShowAllSponsors] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const sponsorsToDisplay = showAllSponsors ? sponsorsData : sponsorsData.slice(0, 6);
  
  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>HR Contact</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Owner Name</label>
              <input type="text" />
            </div>
            <div className="nav-buttons">
              <button onClick={() => setCurrentStep(2)}>Next</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-group">
              <label>CIN</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>GST</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="nav-buttons">
              <button onClick={() => setCurrentStep(1)}>Back</button>
              <button onClick={() => setCurrentStep(3)}>Next</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-group">
              <label>Product Details</label>
              <textarea rows="5"></textarea>
            </div>
            <div className="form-group">
              <label>Company Motto</label>
              <textarea rows="3"></textarea>
            </div>
            <div className="nav-buttons">
              <button onClick={() => setCurrentStep(2)}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="spons-container">
      <div className="spons-content">
        <div className="spons-hero">
          <h1 className="project-title">Aura Attend</h1>
          <h2 className="spons-heading">Our Sponsors</h2>
          <p className="spons-text">
            We are proud to partner with these forward-thinking organizations. Their support enables us to build a seamless and intuitive platform for everyone.
          </p>
          <button className="spons-cta" onClick={() => setShowForm(true)}>Become a Sponsor</button>
        </div>
        
        {showForm ? (
          <form className="sponsor-form">
            <h3 className="form-heading">Sponsorship Application</h3>
            <div className="step-indicators">
              <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</span>
              <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</span>
              <span className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</span>
            </div>
            {renderFormStep()}
          </form>
        ) : (
          <div className="spons-grid-container">
            <h3 className="spons-section-heading">{showAllSponsors ? "All Sponsors" : "Featured Sponsors"}</h3>
            <div className="spons-grid">
              {sponsorsToDisplay.map(sponsor => (
                <div key={sponsor.id} className="sponsor-card" onClick={() => setSelectedSponsor(sponsor)}>
                  <div className="sponsor-card-inner">
                    <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                    <h3 className="sponsor-name">{sponsor.name}</h3>
                    <p className="sponsor-description">{sponsor.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {!showAllSponsors && (
              <button className="load-more-btn" onClick={() => setShowAllSponsors(true)}>
                Show More
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {selectedSponsor && (
        <div className="sponsor-modal-overlay">
          <div className="sponsor-modal">
            <button className="modal-close-btn" onClick={() => setSelectedSponsor(null)}>&times;</button>
            <img src={selectedSponsor.logo} alt={selectedSponsor.name} className="modal-logo" />
            <h3 className="modal-name">{selectedSponsor.name}</h3>
            <p className="modal-details">{selectedSponsor.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spons;