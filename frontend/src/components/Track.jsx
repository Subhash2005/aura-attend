import React, { useState, useEffect } from "react";
import "../styles/Track.css";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import {
    FaCalendarCheck,
    FaUserGraduate,
    FaMapMarkerAlt,
    FaClock,
    FaCamera,
    FaTimes
} from "react-icons/fa";

const Track = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("User");
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [year, setYear] = useState("2026");
    const [sem, setSem] = useState("Semester 6");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Fetch Username + Attendance logs
    useEffect(() => {
        const user = localStorage.getItem("username") || "User";
        setUsername(user);

        const fetchLogs = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/attendance/track/${user}`);
                if (res.ok) {
                    const data = await res.json();
                    
                    // Map flat array to a date-keyed dictionary
                    const mapped = {};
                    data.forEach(record => {
                        mapped[record.date] = {
                            time: record.time,
                            location: record.address || `Lat: ${record.coords.lat}, Lng: ${record.coords.lng}`,
                            selfie: record.photo || "https://via.placeholder.com/150",
                            status: record.status // Present, Absent, OD, Leave
                        };
                    });
                    setAttendanceRecords(mapped);
                }
            } catch (err) {
                console.error("Error fetching track logs:", err);
            }
        };

        fetchLogs();
    }, []);

    // Helper to get CSS class name based on status
    const getStatusClass = (dateKey) => {
        const record = attendanceRecords[dateKey];
        if (!record) return "";
        if (record.status === "Present") return "present"; // Green
        if (record.status === "Absent") return "absent";   // Red (custom class)
        if (record.status === "OD") return "od-status";     // Yellow (custom class)
        if (record.status === "Leave") return "leave-status"; // Orange
        return "present";
    };

    return (
        /* Overlay */
        <div className="track-overlay" onClick={() => navigate(-1)}>
            {/* Bottom Sheet */}
            <div className="track-sheet" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="sheet-header">
                    <h2><FaCalendarCheck /> Track Attendance</h2>
                    <FaTimes className="close-btn" onClick={() => navigate(-1)} />
                </div>

                {/* Student Info */}
                <div className="info-card">
                    <div><FaUserGraduate /> <b>Username:</b> {username}</div>
                    <div><b>Track Database:</b> Active</div>
                    <div><b>Status Color:</b> <span style={{color:'green',fontWeight:'bold'}}>Present (Green)</span> | <span style={{color:'orange',fontWeight:'bold'}}>OD (Yellow)</span></div>

                    <div className="dropdowns">
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option>2025</option>
                            <option>2026</option>
                        </select>

                        <select value={sem} onChange={(e) => setSem(e.target.value)}>
                            <option>Semester 5</option>
                            <option>Semester 6</option>
                            <option>Semester 7</option>
                        </select>
                    </div>

                    <div className="semester-dates">
                        <b>Start:</b> 01-01-2026 | <b>End:</b> 30-06-2026
                    </div>
                </div>

                {/* Calendar */}
                <div className="calendar-card">
                    <h3>May 2026</h3>
                    <div className="calendar-grid">
                        {days.map((day) => {
                            const dateKey = `2026-05-${day.toString().padStart(2, "0")}`;
                            return (
                                <div
                                    key={day}
                                    className={`calendar-day ${getStatusClass(dateKey)}`}
                                    onClick={() => setSelectedDate(dateKey)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Attendance Detail */}
                {selectedDate && attendanceRecords[selectedDate] && (
                    <div className="detail-card">
                        <p><FaClock /> <b>Time:</b> {attendanceRecords[selectedDate].time}</p>
                        <p><FaMapMarkerAlt /> <b>Location:</b> {attendanceRecords[selectedDate].location}</p>
                        <p><b>Status:</b> <span className={`status-badge ${attendanceRecords[selectedDate].status.toLowerCase()}`}>{attendanceRecords[selectedDate].status}</span></p>
                        <div className="selfie-box">
                            <FaCamera />
                            <img src={attendanceRecords[selectedDate].selfie} alt="Selfie" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Track;
