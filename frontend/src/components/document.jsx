import React from 'react';
import '../styles/document.css';

const Documentation = () => {
  return (
    <div className="documentation-container">
      {/* Left Navigation Sidebar */}
      <nav className="documentation-nav">
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
          <li><a href="#organizations">For Organizations</a></li>
          <li><a href="#sponsors">For Sponsors</a></li>
          <li><a href="#reports">Reports & Analytics</a></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="documentation-content">
        <h1 className="project-title">Aura Attend</h1>
        <h2 className="page-heading">Project Documentation</h2>

        <section id="overview" className="doc-section">
          <h3>Project Overview</h3>
          <p>
            Aura Attend is a modern, seamless digital attendance and marketplace platform. It’s designed to simplify the management of attendance for a wide range of users, from educational institutions to private enterprises, while also providing a vibrant digital marketplace.
          </p>
          <p>
            Our mission is to create a unified platform that enhances efficiency and security for all stakeholders.
          </p>
        </section>

        <section id="use-cases" className="doc-section">
          <h3>Key Use Cases</h3>
          <p>Aura Attend provides a flexible solution for various scenarios, including:</p>
          <ul>
            <li><strong>Educational Institutions:</strong> Streamline student and faculty attendance in colleges and schools with automated logging and real-time reports.</li>
            <li><strong>Corporate Campuses:</strong> Efficiently track employee attendance and manage entry access for both staff and visitors.</li>
            <li><strong>Events & Workshops:</strong> Simplify participant check-ins at conferences, workshops, and large-scale events.</li>
            <li><strong>Retail & Shops:</strong> Enable secure access for employees and track customer foot traffic for marketing insights.</li>
          </ul>
        </section>

        <section id="organizations" className="doc-section">
          <h3>For Organizations</h3>
          <p>Organizations can enroll to use our platform to manage their unique attendance needs. We offer:</p>
          <ul>
            <li>Customized dashboards to monitor attendance data.</li>
            <li>Integration with existing campus or company systems.</li>
            <li>Dedicated support channels and account managers.</li>
            <li>Secure and private data handling.</li>
          </ul>
        </section>

        <section id="sponsors" className="doc-section">
          <h3>For Sponsors</h3>
          <p>
            Sponsors play a vital role in our project's growth. By partnering with Aura Attend, your organization gains valuable exposure to our diverse user base.
          </p>
          <p>Sponsorship opportunities include:</p>
          <ul>
            <li>Featured placement on our website and in-app promotions.</li>
            <li>Branding on reports and documentation materials.</li>
            <li>Access to unique networking and business development events.</li>
          </ul>
        </section>

        <section id="reports" className="doc-section">
          <h3>Reports & Analytics</h3>
          <p>Our platform provides comprehensive reporting tools to give you actionable insights into attendance and usage patterns. Features include:</p>
          <ul>
            <li>Real-time attendance dashboards.</li>
            <li>Daily, weekly, and monthly attendance summaries.</li>
            <li>Customizable reports based on specific criteria.</li>
            <li>Secure data export options.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Documentation;