import React, { useState, useEffect } from "react";
import "../styles/Graph.css";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import {
    FaChartPie,
    FaCheck,
    FaTimes,
    FaBriefcase,
    FaCalendarCheck,
    FaRupeeSign,
    FaChevronDown
} from "react-icons/fa";

const Graph = () => {
    const navigate = useNavigate();

    // Dropdown filters (pure UI styling matching original)
    const [year, setYear] = useState("2026");
    const [sem, setSem] = useState("Semester 6");
    const [month, setMonth] = useState("May");

    // Dynamic state variables
    const [stats, setStats] = useState({
        present: 0,
        absent: 0,
        od: 0,
        leave: 0,
        totalUnpaidFees: 0,
        totalRecords: 0
    });

    useEffect(() => {
        const user = localStorage.getItem("username") || "User";
        fetchStats(user);
    }, []);

    const fetchStats = async (user) => {
        try {
            const res = await fetch(`${API_BASE}/api/attendance/graph-stats/${user}`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (err) {
            console.error("Error fetching graph stats:", err);
        }
    };

    const { present, absent, od, leave, totalUnpaidFees, totalRecords } = stats;

    // Calculate percentages dynamically
    const presentPct = totalRecords > 0 ? Math.round((present / totalRecords) * 100) : 0;
    const absentPct = totalRecords > 0 ? Math.round((absent / totalRecords) * 100) : 0;
    const odPct = totalRecords > 0 ? Math.round((od / totalRecords) * 100) : 0;
    const leavePct = totalRecords > 0 ? Math.round((leave / totalRecords) * 100) : 0;

    return (
        <div className="graph-overlay" onClick={() => navigate(-1)}>
            <div className="graph-sheet" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="graph-header">
                    <h2><FaChartPie /> Attendance Insights</h2>
                    <FaTimes className="close-btn" onClick={() => navigate(-1)} />
                </div>

                {/* Note */}
                <center>
                    <span className="graph-db-stamp">Live Database Analytics: active track_db &amp; fees_db</span>
                </center>

                {/* Filters */}
                <div className="filter-row">
                    <div className="filter">
                        <span>Year</span>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option>2025</option>
                            <option>2026</option>
                        </select>
                        <FaChevronDown />
                    </div>

                    <div className="filter">
                        <span>Semester</span>
                        <select value={sem} onChange={(e) => setSem(e.target.value)}>
                            <option>Semester 5</option>
                            <option>Semester 6</option>
                            <option>Semester 7</option>
                        </select>
                        <FaChevronDown />
                    </div>

                    <div className="filter">
                        <span>Month</span>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                        </select>
                        <FaChevronDown />
                    </div>
                </div>

                {/* Radial Chart */}
                <div className="radial-wrapper">
                    <div className="ring present-ring" style={{ "--value": presentPct }}>
                        <span>{presentPct}%</span>
                        <p>Present</p>
                    </div>

                    <div className="ring absent-ring" style={{ "--value": absentPct }}>
                        <span>{absentPct}%</span>
                        <p>Absent</p>
                    </div>

                    <div className="ring od-ring" style={{ "--value": odPct }}>
                        <span>{odPct}%</span>
                        <p>OD</p>
                    </div>

                    <div className="ring leave-ring" style={{ "--value": leavePct }}>
                        <span>{leavePct}%</span>
                        <p>Leave</p>
                    </div>
                </div>

                {/* Summary Row */}
                <div className="summary-row">
                    <div className="summary present">
                        <FaCheck /> Present: {present}
                    </div>
                    <div className="summary absent">
                        <FaTimes /> Absent: {absent}
                    </div>
                    <div className="summary od">
                        <FaBriefcase /> OD: {od}
                    </div>
                    <div className="summary leave">
                        <FaCalendarCheck /> Leave: {leave}
                    </div>
                </div>

                {/* Leave Fee / Unpaid Penalty Outstanding */}
                <div className="fee-card">
                    <FaRupeeSign />
                    <div>
                        <h4>Unpaid Absent Fines</h4>
                        <p>Aggregated outstanding from fees_db ({absent} Absences × ₹150)</p>
                    </div>
                    <span className="fee-amount">₹{totalUnpaidFees}</span>
                </div>

            </div>
        </div>
    );
};

export default Graph;
