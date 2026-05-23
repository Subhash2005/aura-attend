import React from "react";
import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
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
  );
}

export default App;
