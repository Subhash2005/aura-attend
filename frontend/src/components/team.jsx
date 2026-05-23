import React, { useState } from 'react';
import '../styles/team.css'; // Make sure this path is correct

function Team() {
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const Team = [
    {
      name: 'Technical Team',
      id: 'technical',
      members: ['Subhash', '📞 7695903778', '✉️ subhash1422005s@gmail.com'],
      icon: '⚙️'
    },
    {
      name: 'Core Members',
      id: 'core',
      members: ['Subhash', '📞 7695903778', '✉️ subhash1422005s@gmail.com'],
      icon: '👑'
    },
    {
      name: 'Media Team',
      id: 'media',
      members: ['Subhash', '📞 7695903778', '✉️ subhash1422005s@gmail.com'],
      icon: '📸'
    },
  ];

  return (
    <div className="team-cards-section">
      <h2 className="section-title">Meet Our Team</h2>
      <div className="team-cards-grid">
        {Team.map((team) => (
          <div
            key={team.id}
            className={`team-card ${hoveredTeam === team.id ? 'is-active' : ''}`}
            onMouseEnter={() => setHoveredTeam(team.id)}
            onMouseLeave={() => setHoveredTeam(null)}
          >
            <div className="card-front">
              <span className="card-icon">{team.icon}</span>
              <h3 className="card-title">{team.name}</h3>
            </div>
            <div className="card-back">
              <ul className="member-list">
                {team.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;