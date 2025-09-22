import React, { useState } from 'react';
import '../styles/organization.css';

const organizationData = [
  {
    category: 'Colleges',
    id: 'colleges',
    organizations: [
      { id: 1, name: 'State University', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=C1' },
      { id: 2, name: 'Tech Institute', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=C2' },
      { id: 3, name: 'Community College', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=C3' },
      { id: 4, name: 'Ivy Academy', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=C4' },
      { id: 5, name: 'Global University', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=C5' },
    ],
  },
  {
    category: 'Companies',
    id: 'companies',
    organizations: [
      { id: 1, name: 'Tech Solutions Inc.', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Co1' },
      { id: 2, name: 'Global Corp', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Co2' },
      { id: 3, name: 'Innovate Solutions', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Co3' },
      { id: 4, name: 'Future Enterprises', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Co4' },
    ],
  },
  {
    category: 'Schools',
    id: 'schools',
    organizations: [
      { id: 1, name: 'Liberty High School', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=S1' },
      { id: 2, name: 'Maple Elementary', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=S2' },
      { id: 3, name: 'Sunrise School', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=S3' },
    ],
  },
  {
    category: 'Shops',
    id: 'shops',
    organizations: [
      { id: 1, name: 'Local Grocer', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Sh1' },
      { id: 2, name: 'Fashion Boutique', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Sh2' },
      { id: 3, name: 'Book Nook', logo: 'https://placehold.co/100x100/f0f9ff/334155?text=Sh3' },
    ],
  },
];

const Organizations = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
                <img src={org.logo} alt={org.name} className="org-logo" />
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
                {category.organizations.slice(0, 4).map((org) => (
                  <div 
                    key={org.id} 
                    className="org-carousel-item" 
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <img src={org.logo} alt={org.name} className="org-logo" />
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