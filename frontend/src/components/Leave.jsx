import React, { useState, useEffect } from "react";
import "../styles/Leave.css";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import {
    FaCalendarAlt,
    FaClipboardList,
    FaTimesCircle,
    FaCheckCircle,
    FaClock,
    FaPaperPlane
} from "react-icons/fa";

const Leave = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("User");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [leaves, setLeaves] = useState([]);

    // Fetch user + existing leaves
    useEffect(() => {
        const user = localStorage.getItem("username") || "User";
        setUsername(user);
        fetchLeaves(user);
    }, []);

    const fetchLeaves = async (user) => {
        try {
            const res = await fetch(`${API_BASE}/api/attendance/leave/${user}`);
            if (res.ok) {
                const data = await res.json();
                setLeaves(data);
            }
        } catch (err) {
            console.error("Error fetching leaves:", err);
        }
    };

    const handleApplyLeave = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason) {
            alert("Please fill in all fields before submitting!");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/attendance/leave`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    startDate,
                    endDate,
                    reason
                })
            });

            if (res.ok) {
                alert("Leave Request Approved and Logged in Database!");
                setStartDate("");
                setEndDate("");
                setReason("");
                fetchLeaves(username); // reload list
            } else {
                alert("Failed to apply leave. Please try again.");
            }
        } catch (err) {
            console.error("Error applying leave:", err);
            alert("Server connection failed. Please try again.");
        }
    };

    return (
        <div className="leave-overlay" onClick={() => navigate(-1)}>
            <div className="leave-sheet" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="leave-header">
                    <h2><FaCalendarAlt /> Apply Leave</h2>
                    <FaTimesCircle className="close-btn" onClick={() => navigate(-1)} />
                </div>

                {/* Info Note */}
                <div className="leave-note">
                    <p>Leave requests are automatically logged into the <b>leave db</b> and immediately pinned onto your attendance tracking calendar.</p>
                </div>

                {/* Form & List Columns */}
                <div className="leave-body-grid">
                    
                    {/* Form Column */}
                    <div className="leave-card-form">
                        <h3>New Leave Application</h3>
                        <form onSubmit={handleApplyLeave}>
                            <div className="form-group">
                                <label><FaCalendarAlt /> Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label><FaCalendarAlt /> End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label><FaClipboardList /> Reason</label>
                                <textarea
                                    placeholder="Enter your leave reason (e.g. medical, personal, emergency)..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-leave-btn">
                                <FaPaperPlane /> Submit Application
                            </button>
                        </form>
                    </div>

                    {/* History Column */}
                    <div className="leave-card-history">
                        <h3>Leave Database Logs</h3>
                        <div className="leave-list">
                            {leaves.length === 0 ? (
                                <div className="empty-leaves">
                                    <FaClock />
                                    <p>No leave logs found in database.</p>
                                </div>
                            ) : (
                                leaves.map((lv, idx) => (
                                    <div key={lv.id || lv._id || idx} className="leave-item">
                                        <div className="leave-item-header">
                                            <span className={`status-pill ${lv.status.toLowerCase()}`}>
                                                {lv.status === "Approved" && <FaCheckCircle />} {lv.status}
                                            </span>
                                            <span className="leave-date">{lv.startDate} to {lv.endDate}</span>
                                        </div>
                                        <p className="leave-reason"><b>Reason:</b> {lv.reason}</p>
                                        <span className="leave-db-stamp">leave_db log verified</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Leave;
