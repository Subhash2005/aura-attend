import React from 'react';
import '../styles/services.css';

function Services() {
  const serviceList = [
    {
      id: 1,
      icon: '📲',
      title: 'Touchless Check-in',
      description: 'Lightning-fast attendance recording via QR Codes, NFC tags, and mobile geo-location logs.'
    },
    {
      id: 2,
      icon: '📊',
      title: 'Real-time Telemetry',
      description: 'Monitor check-ins live with visual trend graphs, interactive diagrams, and status monitors.'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Role-based Views',
      description: 'Fully personalized portals for school teachers, college HODs, company HRs, and students.'
    },
    {
      id: 4,
      icon: '📝',
      title: 'Digital OD & Leave',
      description: 'Submit and approve official duty (OD) slips and leave requests digitally in one unified stream.'
    },
    {
      id: 5,
      icon: '🔔',
      title: 'Instant Bulletins',
      description: 'Stay updated with automated push notifications and email summaries sent directly to inbox.'
    }
  ];

  return (
    <section className="services-section" id="services">
      <h2 className="services-title">Our Premium Services</h2>
      <div className="services-grid">
        {serviceList.map((service) => (
          <div key={service.id} className="service-card">
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
