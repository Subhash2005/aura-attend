import React, { useState } from "react";
import "../styles/register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const Register = () => {
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Role-specific details
  const renderRoleDetails = () => {
    if (!role) return null;

    switch (role) {
      case "teacher":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="School Name" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Class Handling" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Subject" required />
            </div>
          </>
        );
      case "student":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="School/College Name" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Class/Year" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Department/Section" required />
            </div>
          </>
        );
      case "admin":
        return (
          <div className="input-group">
            <input type="text" className="register-input" placeholder="Organization/Institute Name" required />
          </div>
        );
      case "staff":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="College Name" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Department" required />
            </div>
          </>
        );
      case "hod":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="College Name" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Department" required />
            </div>
            <div className="input-group">
              <input type="number" className="register-input" placeholder="Years of Experience" required />
            </div>
          </>
        );
      case "employee":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Company Name" required />
            </div>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Designation" required />
            </div>
          </>
        );
      case "hr":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Company Name" required />
            </div>
            <div className="input-group">
              <input type="number" className="register-input" placeholder="Years in HR" required />
            </div>
          </>
        );
      case "shop":
        return (
          <div className="input-group">
            <input type="text" className="register-input" placeholder="Shop/Store Name" required />
          </div>
        );
      case "apartment":
        return (
          <>
            <div className="input-group">
              <input type="text" className="register-input" placeholder="Apartment Name" required />
            </div>
            <div className="input-group">
              <input type="number" className="register-input" placeholder="Number of Flats" required />
            </div>
          </>
        );
      case "ngo":
        return (
          <div className="input-group">
            <input type="text" className="register-input" placeholder="NGO Name" required />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {!submitted ? (
          <>
            <h2 className="register-title">✨ Aura Attend Registration</h2>
            <form onSubmit={handleSubmit} className="register-form">
              {/* Username */}
              <div className="input-group">
                <FaUser className="input-icon" />
                <input type="text" className="register-input" placeholder="Username" required />
              </div>

              {/* Email */}
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" className="register-input" placeholder="Email" required />
              </div>

              {/* Mobile */}
              <div className="input-group">
                <FaPhone className="input-icon" />
                <input type="tel" className="register-input" placeholder="Mobile Number" pattern="[0-9]{10}" required />
              </div>

              {/* Category */}
              <div className="input-group">
                <select className="register-input" value={category} onChange={(e) => { setCategory(e.target.value); setRole(""); }} required>
                  <option value="">Select Category</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="company">Company</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              {/* Role Selection */}
              {category && (
                <div className="input-group">
                  <select className="register-input" value={role} onChange={(e) => setRole(e.target.value)} required>
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

              {/* Role-specific details */}
              {renderRoleDetails()}

              {/* Password */}
              {role && (
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="register-input"
                    placeholder="Password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Minimum 8 characters, at least one uppercase, one lowercase, one number and one special character"
                    required
                  />
                </div>
              )}

              <button type="submit" className="register-btn">Register</button>
            </form>
          </>
        ) : (
          <div className="register-success">
            🎉 Welcome to <strong>Aura Attend</strong>!
            <p>Your journey starts here 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
