import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

import Home from "./home";
import Team from "./team";
import Services from "./services";
import Bottom from "./bottom";
import CardAni from "./use";
import DemoVideo from "./video";
import Footer from "./footer";

import Join from "./join.jsx";
import Suggestion from "./suggestion.jsx";
import Organizations from "./organization.jsx";
import Spons from "./spons.jsx";
import Donate from "./donate.jsx";
import Documentation from "./document.jsx";

import Login from "./login.jsx";
import Register from "./register.jsx";
import Attendance from "./post_attendance.jsx";
import Track from "./Track.jsx";
import AttendanceLayout from "./AttendanceLayout.jsx";
import Graph from "./Graph.jsx";
import Profile from "./Profile.jsx";
import Od from "./Od.jsx";
import Leave from "./Leave.jsx";
import Fees from "./Fees.jsx";

function MobileBackBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = [
    "/",
    "/dashboard/track",
    "/dashboard/graph",
    "/dashboard/profile",
    "/dashboard/od",
    "/dashboard/leave",
    "/dashboard/fees"
  ];

  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <div
      className="mobile-back-global"
      onClick={() => navigate(-1)}
      style={{
        display: window.innerWidth <= 768 ? "flex" : "none",
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: 99999,
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "20px",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <FaArrowLeft /> Back
    </div>
  );
}

function App() {
  return (
    <>
      <ThemeToggle />
      <MobileBackBtn />
      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Team />
              <Bottom />
              <CardAni />
              <DemoVideo />
              <Footer />
            </>
          }
        />

        <Route path="/services" element={<Services />} />
        <Route path="/join" element={<Join />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/organization" element={<Organizations />} />
        <Route path="/spons" element={<Spons />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/documentation" element={<Documentation />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Attendance (Protected or After Login) */}
        <Route path="/attendance" element={<Attendance />} />

        {/* Dashboard / Nested Routes under AttendanceLayout */}
        <Route path="/dashboard" element={<AttendanceLayout />}>
          <Route path="track" element={<Track />} />
          <Route path="graph" element={<Graph />} />
          <Route path="profile" element={<Profile />} />
          <Route path="od" element={<Od />} />
          <Route path="leave" element={<Leave />} />
          <Route path="fees" element={<Fees />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </>
  );
}

export default App;
