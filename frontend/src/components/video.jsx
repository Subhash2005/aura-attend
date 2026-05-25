import React, { useEffect, useRef, useState } from 'react';
import '../styles/DemoVideo.css';
import demoVideo from '../assets/video/20260525-1301-05.3538754.mp4';

function DemoVideo() {
  const videoRef = useRef(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Video Playback Control
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasInteracted(true);
    }
  };

  // Counter Animation
  useEffect(() => {
    const endCount = 12500;
    const duration = 2000;
    const increment = Math.ceil(endCount / (duration / 10));
    let start = 0;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endCount) {
        setActiveUsers(endCount);
        clearInterval(timer);
      } else {
        setActiveUsers(start);
      }
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-wrapper">
      <div className="main-content-card">
        {/* Video Player Section */}
        <div className="video-player-container">
          <h2 className="video-title">Our Product in Action</h2>
          <div className="video-wrapper">
            <video ref={videoRef} className="demo-video" controls loop>
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!hasInteracted && (
              <div className="video-overlay" onClick={handlePlayClick}>
                <button className="play-button">
                  ▶️
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Counter Section */}
        <div className="stats-panel">
          <div className="stats-card">
            <div className="counter-number">
              {activeUsers.toLocaleString()}
            </div>
            <div className="counter-label">
              Active Users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoVideo;