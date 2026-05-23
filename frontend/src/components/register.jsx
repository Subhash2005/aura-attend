import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import API_BASE from "../config";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [category, setCategory] = useState("");
    const [role, setRole] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Dedicated form states to resolve browser autofill and empty payload errors
    const [orgName, setOrgName] = useState("");
    const [password, setPassword] = useState("");
    const [classYear, setClassYear] = useState("");
    const [dept, setDept] = useState("");
    const [classHandling, setClassHandling] = useState("");
    const [subject, setSubject] = useState("");
    const [designation, setDesignation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Compile roleDetails dynamically
        const roleDetails = {};
        if (role === "student") {
            roleDetails.classYear = classYear;
            roleDetails.dept = dept;
        } else if (role === "teacher") {
            roleDetails.classHandling = classHandling;
            roleDetails.subject = subject;
        } else if (role === "staff" || role === "hod") {
            roleDetails.dept = dept;
        } else if (role === "employee" || role === "hr") {
            roleDetails.designation = designation;
        }

        const payload = {
            username,
            email,
            mobile,
            category,
            organizationName: orgName,
            role,
            password,
            roleDetails
        };

        try {
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                setSubmitted(true);
                console.log("Registered successfully");
                alert("Registration successful! Redirecting to login...");
                navigate("/login");
            } else {
                console.error("Something went wrong");
                alert(`Registration Failed: ${data.msg || "Please check if fields are entered correctly!"}`);
            }
        } catch (err) {
            console.error(err);
            alert("Server connection failed. Please make sure the backend is running!");
        }
    };

    const renderRoleDetails = () => {
        if (!role) return null;

        switch (role) {
            case "teacher":
                return (
                    <>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="School Name"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Class Handling"
                            required
                            value={classHandling}
                            onChange={(e) => setClassHandling(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </>
                );

            case "student":
                return (
                    <>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="School/College Name"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Class/Year"
                            required
                            value={classYear}
                            onChange={(e) => setClassYear(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Department/Section"
                            required
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                        />
                    </>
                );

            case "staff":
            case "hod":
                return (
                    <>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="College/School Name"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Department"
                            required
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                        />
                    </>
                );

            case "employee":
            case "hr":
                return (
                    <>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Company Name"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Designation"
                            required
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </>
                );

            case "admin":
            case "shop":
            case "apartment":
            case "ngo":
                return (
                    <input
                        type="text"
                        className="register-input"
                        placeholder="Organization/Company/Shop Name"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        className="register-input"
                        placeholder="Organization/School/Company Name"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                );
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                {!submitted ? (
                    <>
                        <h2 className="register-title">✨ Aura Attend Registration</h2>
                        <form onSubmit={handleSubmit} className="register-form">

                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    className="register-input"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    className="register-input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <FaPhone className="input-icon" />
                                <input
                                    type="tel"
                                    className="register-input"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <select
                                    className="register-input"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setRole("");
                                        setOrgName("");
                                    }}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="school">School</option>
                                    <option value="college">College</option>
                                    <option value="company">Company</option>
                                    <option value="organization">Organization</option>
                                </select>
                            </div>

                            {category && (
                                <div className="input-group">
                                    <select
                                        className="register-input"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        {category === "school" && <>
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                            <option value="admin">Admin</option>
                                        </>}
                                        {category === "college" && <>
                                            <option value="student">Student</option>
                                            <option value="staff">Staff</option>
                                            <option value="hod">HOD</option>
                                            <option value="admin">Admin</option>
                                        </>}
                                        {category === "company" && <>
                                            <option value="employee">Employee</option>
                                            <option value="hr">HR</option>
                                            <option value="admin">Admin</option>
                                        </>}
                                        {category === "organization" && <>
                                            <option value="shop">Shop</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="ngo">NGO</option>
                                        </>}
                                    </select>
                                </div>
                            )}

                            {renderRoleDetails()}

                            {role && (
                                <div className="input-group">
                                    <FaLock className="input-icon" />
                                    <input
                                        type="password"
                                        className="register-input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <button type="submit" className="register-btn">
                                Register
                            </button>

                        </form>
                    </>
                ) : (
                    <div className="register-success">
                        Welcome to <strong>Aura Attend</strong>!
                        <p>Your journey starts here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
