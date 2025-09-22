import React from 'react';
import '../styles/bottom.css'; // Make sure this path is correct

function Bottom() {
  const useCaseData = [
    {
      id: 'marketplace',
      heading: 'Digital Marketplace',
      description: 'A dedicated platform for buying and selling a wide range of digital products, including themes, plugins, and graphics. Secure transactions and a global reach are at your fingertips.',
    },
    {
      id: 'attendance',
      heading: 'Effortless Attendance Management',
      description: 'Simplify employee attendance tracking with our intuitive system. Generate real-time reports, monitor check-ins, and streamline payroll processes with ease and accuracy.',
    },
    {
      id: 'project-management',
      heading: 'Project Management & Collaboration',
      description: 'Organize your projects, assign tasks, and collaborate with your team in one unified workspace. Our tools help you stay on track and deliver projects on time.',
    },
  ];

  return (
    <div className="timeline-section">
      <h2 className="section-title">Use Cases</h2>
      <div className="timeline-container">
        {useCaseData.map((useCase, index) => (
          <div
            key={useCase.id}
            className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
          >
            <div className="timeline-content shimmer-card">
              <h3>{useCase.heading}</h3>
              <p>{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bottom;