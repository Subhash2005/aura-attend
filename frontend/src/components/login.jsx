import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import API_BASE from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) return;

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("username", username);
        navigate("/attendance");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="login-body">
      <div className="orb"></div>
      <div className="orb"></div>
      <div className="orb"></div>

      <div className="login-wrapper">
        <div className="login-frame">
          <div className="login-card">
            <div className="badge">L</div>
            <div className="title">Log In</div>
            <div className="subtitle">
              Welcome back — enter your credentials.
            </div>

            <form onSubmit={handleLogin}>
              <div className="field-group">
                <input
                  type="text"
                  className="field-input"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="field-label">Username</label>
                <div className="field-icon"><span>U</span></div>
              </div>

              <div className="field-group">
                <input
                  type="password"
                  className="field-input"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="field-label">Password</label>
                <div className="field-icon"><span>P</span></div>
              </div>

              <button type="submit" className="login-btn">
                Enter
              </button>
            </form>

            <center>
              <a href="/register" className="login-link">
                Register
              </a>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
