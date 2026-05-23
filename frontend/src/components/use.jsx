import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/CardAnimation.css';

import marketplaceImg from '../assets/features/marketplace.png';
import attendanceImg from '../assets/features/attendance.png';
import projectImg from '../assets/features/project.png';
import clientImg from '../assets/features/client.png';
import analyticsImg from '../assets/features/analytics.png';
import teamImg from '../assets/features/team.png';

const cardContentData = [
  { id: 1, title: 'DIGITAL', description: 'MARKETPLACE', imageUrl: marketplaceImg },
  { id: 2, title: 'EASY', description: 'ATTENDANCE', imageUrl: attendanceImg },
  { id: 3, title: 'PROJECT', description: 'MANAGER', imageUrl: projectImg },
  { id: 4, title: 'CLIENT', description: 'RELATIONS', imageUrl: clientImg },
  { id: 5, title: 'ANALYTICS', description: 'INSIGHTS', imageUrl: analyticsImg },
  { id: 6, title: 'TEAM', description: 'COLLABORATION', imageUrl: teamImg },
];

function DynamicUseCases() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.dynamic-card', containerRef.current);

    // Initial state: Cards are off-screen and slightly rotated
    gsap.set(cards, {
      opacity: 0,
      rotationY: 90,
      x: (i) => (i % 2 === 0 ? -600 : 600),
      y: (i) => (i % 2 === 0 ? 400 : -400),
      scale: 0.8,
      transformPerspective: 1000,
    });

    const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

    // Initial staggered entry and subtle rotation to grid
    masterTl.to(cards, {
      opacity: 1,
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.2,
    });

    // Continuous subtle 3D pivot for all cards
    masterTl.to(cards, {
      rotationY: 20,
      y: "+=10",
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    }, ">");

  }, []);

  return (
    <div className="dynamic-cards-section">
      <h2 className="section-title">Explore Our Features</h2>
      <div className="card-grid" ref={containerRef}>
        {cardContentData.map((data) => (
          <div key={data.id} className="dynamic-card">
            <img src={data.imageUrl} alt={data.title} className="card-background-image" />
            <div className="card-text-overlay">
              <span className="card-main-title">{data.title}</span>
              <span className="card-sub-title">{data.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicUseCases;