import React, { useState, useEffect } from 'react';
import '../styles/organization.css';
import API_BASE from '../config';

// Self-healing avatar image component with a smooth monogram fallback
const OrgLogo = ({ org }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed || !org.logo) {
    return <div className="org-avatar">{org.name.charAt(0)}</div>;
  }

  return (
    <div className="org-avatar-container">
      <img 
        src={org.logo} 
        alt={org.name} 
        className="org-logo-img" 
        onError={() => setImgFailed(true)} 
      />
    </div>
  );
};

const Organizations = () => {
  const [orgs, setOrgs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch Organizations from backend
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/explore/organizations`);
        if (res.ok) {
          const data = await res.json();
          setOrgs(data);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
      }
    };
    fetchOrgs();
  }, []);

  // Map flat DB array to structured category lists dynamically
  const organizationData = [
    {
      category: 'Colleges',
      id: 'colleges',
      organizations: orgs.filter(o => o.category.toLowerCase() === 'colleges')
    },
    {
      category: 'Companies',
      id: 'companies',
      organizations: orgs.filter(o => o.category.toLowerCase() === 'companies')
    },
    {
      category: 'Schools',
      id: 'schools',
      organizations: orgs.filter(o => o.category.toLowerCase() === 'schools')
    },
    {
      category: 'Shops',
      id: 'shops',
      organizations: orgs.filter(o => o.category.toLowerCase() === 'shops')
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const currentOrganizations = organizationData.find(cat => cat.id === selectedCategory);

  return (
    <div className="organizations-container animate">
      <h1 className="project-title">Aura Attend</h1>
      <h2 className="page-heading">Our Valued Partners</h2>

      {selectedCategory ? (
        <div className="all-organizations-view">
          <button onClick={handleBackClick} className="back-button">
            &larr; Back to Categories
          </button>
          <h3 className="category-heading">{currentOrganizations.category}</h3>
          <div className="full-list-grid">
            {currentOrganizations.organizations.map((org) => (
              <div key={org.id} className="org-card">
                <OrgLogo org={org} />
                <p className="org-name">{org.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="category-sections">
          {organizationData.map((category) => (
            <div key={category.id} className="category-section">
              <h3 className="category-heading">{category.category}</h3>
              <div className="org-carousel">
                {category.organizations.slice(0, 5).map((org) => (
                  <div 
                    key={org.id} 
                    className="org-carousel-item" 
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <OrgLogo org={org} />
                    <p className="org-name">{org.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;