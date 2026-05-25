import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("aura-theme") || "light-mode";
  });

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(theme);
    
    // Crucial for mobile browsers: Apply to HTML root directly
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(theme);
    
    localStorage.setItem("aura-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "14px",
        right: "14px",
        zIndex: 100000,
        width: "30px",
        height: "30px",
        border: "none",
        borderRadius: "50%",
        background: theme === "dark-mode" ? "#f39c12" : "#2c3e50",
        color: theme === "dark-mode" ? "#fff" : "#fff",
        fontSize: "0.9rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease, background 0.3s ease"
      }}
      aria-label={`Switch to ${theme === "dark-mode" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark-mode" ? "light" : "dark"} mode`}
    >
      {theme === "dark-mode" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
