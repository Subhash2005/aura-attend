import React, { useState, useEffect } from 'react';
import '../styles/spons.css';
import API_BASE from '../config';

// Self-healing logo avatar component with a gorgeous text-based monogram fallback
const SponsorLogo = ({ sponsor }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed || !sponsor.logo) {
    return <div className="sponsor-avatar">{sponsor.name.charAt(0)}</div>;
  }

  return (
    <div className="sponsor-logo-container">
      <img 
        src={sponsor.logo} 
        alt={sponsor.name} 
        className="sponsor-logo-img" 
        onError={() => setImgFailed(true)} 
      />
    </div>
  );
};

const Spons = () => {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [showAllSponsors, setShowAllSponsors] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  // Form Fields State
  const [companyName, setCompanyName] = useState("");
  const [hrContact, setHrContact] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [cin, setCin] = useState("");
  const [gst, setGst] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [companyMotto, setCompanyMotto] = useState("");

  // Fetch Sponsors from backend
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/explore/sponsors`);
        if (res.ok) {
          const data = await res.json();
          setSponsorsData(data);
        }
      } catch (err) {
        console.error("Error fetching sponsors:", err);
      }
    };
    fetchSponsors();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      companyName,
      hrContact,
      ownerName,
      cin,
      gst,
      mobileNumber,
      email,
      productDetails,
      companyMotto
    };

    try {
      const res = await fetch(`${API_BASE}/api/explore/become-sponsor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Application submitted successfully! Thank you for sponsoring Aura Attend.");
        setShowForm(false);
        setCurrentStep(1);
        // Clear fields
        setCompanyName("");
        setHrContact("");
        setOwnerName("");
        setCin("");
        setGst("");
        setMobileNumber("");
        setEmail("");
        setProductDetails("");
        setCompanyMotto("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed. Please try again.");
    }
  };

  const sponsorsToDisplay = showAllSponsors ? sponsorsData : sponsorsData.slice(0, 6);
  
  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>Company Name</label>
              <input 
                type="text" 
                required 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>HR Contact</label>
              <input 
                type="text" 
                required 
                value={hrContact}
                onChange={(e) => setHrContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Owner Name</label>
              <input 
                type="text" 
                required 
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
            <div className="nav-buttons">
              <button type="button" onClick={() => {
                if (companyName && hrContact && ownerName) {
                  setCurrentStep(2);
                } else {
                  alert("Please fill out all fields.");
                }
              }}>Next</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-group">
              <label>CIN (Corporate Identification Number)</label>
              <input 
                type="text" 
                required 
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>GST Number</label>
              <input 
                type="text" 
                required 
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                required 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="nav-buttons">
              <button type="button" onClick={() => setCurrentStep(1)}>Back</button>
              <button type="button" onClick={() => {
                if (cin && gst && mobileNumber && email) {
                  setCurrentStep(3);
                } else {
                  alert("Please fill out all fields.");
                }
              }}>Next</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-group">
              <label>Product Details</label>
              <textarea 
                rows="5" 
                required 
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Company Motto</label>
              <textarea 
                rows="3" 
                required 
                value={companyMotto}
                onChange={(e) => setCompanyMotto(e.target.value)}
              ></textarea>
            </div>
            <div className="nav-buttons">
              <button type="button" onClick={() => setCurrentStep(2)}>Back</button>
              <button type="submit">Submit Application</button>
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
          <form className="sponsor-form" onSubmit={handleFormSubmit}>
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
                    <SponsorLogo sponsor={sponsor} />
                    <h3 className="sponsor-name">{sponsor.name}</h3>
                    <p className="sponsor-description">{sponsor.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {!showAllSponsors && sponsorsData.length > 6 && (
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
            <SponsorLogo sponsor={selectedSponsor} />
            <h3 className="modal-name">{selectedSponsor.name}</h3>
            <p className="modal-details">{selectedSponsor.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spons;