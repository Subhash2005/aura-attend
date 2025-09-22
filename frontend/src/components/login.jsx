import React, { useState } from 'react';
import '../styles/login.css';

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  };

  return (
    <div className="auth-page-container">
      <div className={`container ${isActive ? 'active' : ''}`}>
        
        {/* Background element */}
        <div className="auth-background"></div>

        {/* LOGIN FORM */}
        <div className="form-box Login">
          <h2>Login</h2>
          <div className="input-box">
            <input type="text" required />
            <label>Username</label>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="regi-link">
            Don’t have an account?{" "}
            <a href="#" onClick={handleRegisterClick}>Sign Up</a>
          </div>
        </div>

        {/* LOGIN INFO */}
        <div className="info-content Login">
          <h2>WELCOME BACK!</h2>
          <p>We are happy to have you with us again. If you need anything, we are here to help.</p>
        </div>
        
        {/* REGISTER FORM */}
        <div className="form-box Register">
          <h2>Register</h2>
          <div className="input-box">
            <input type="text" required />
            <label>Username</label>
          </div>
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="regi-link">
            Already have an account?{" "}
            <a href="#" onClick={handleLoginClick}>Sign In</a>
          </div>
        </div>

        {/* REGISTER INFO */}
        <div className="info-content Register">
          <h2>WELCOME!</h2>
          <p>We’re delighted to have you here. If you need any assistance, feel free to reach out.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
