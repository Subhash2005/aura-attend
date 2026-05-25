import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import "../styles/Fees.css";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import {
    FaCreditCard,
    FaReceipt,
    FaTimesCircle,
    FaCheckCircle,
    FaHourglassHalf,
    FaRupeeSign,
    FaUniversity,
    FaFileInvoiceDollar
} from "react-icons/fa";

const Fees = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("User");
    const [fees, setFees] = useState([]);
    const [totalOutstanding, setTotalOutstanding] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);

    useEffect(() => {
        const user = localStorage.getItem("username") || "User";
        setUsername(user);
        fetchFees(user);
    }, []);

    const fetchFees = async (user) => {
        try {
            const res = await fetch(`${API_BASE}/api/attendance/fees/${user}`);
            if (res.ok) {
                const data = await res.json();
                setFees(data);
                
                // Calculate totals
                let outstanding = 0;
                let paid = 0;
                data.forEach(f => {
                    if (f.status === "Paid") {
                        paid += f.amount;
                    } else {
                        outstanding += f.amount;
                    }
                });
                setTotalOutstanding(outstanding);
                setTotalPaid(paid);
            }
        } catch (err) {
            console.error("Error fetching fees:", err);
        }
    };

    const handlePayFee = async (feeId) => {
        try {
            const res = await fetch(`${API_BASE}/api/attendance/fees/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    feeId
                })
            });

            if (res.ok) {
                Swal.fire("Checkout successful! Fine paid successfully. Status updated in fees_db.");
                fetchFees(username); // reload ledger
            } else {
                Swal.fire("Payment processing failed. Please try again.");
            }
        } catch (err) {
            console.error("Error paying fine:", err);
            Swal.fire("Payment connection timeout. Please try again.");
        }
    };

    return (
        <div className="fees-overlay" onClick={() => navigate(-1)}>
            <div className="fees-sheet" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="fees-header">
                    <h2><FaFileInvoiceDollar /> Leave & Absent Fees</h2>
                    <FaTimesCircle className="close-btn" onClick={() => navigate(-1)} />
                </div>

                {/* Ledger Cards */}
                <div className="ledger-overview">
                    <div className="ledger-card outstanding">
                        <FaHourglassHalf className="icon" />
                        <div>
                            <h4>Outstanding Balance</h4>
                            <span className="amount">₹{totalOutstanding}</span>
                        </div>
                    </div>

                    <div className="ledger-card paid">
                        <FaCheckCircle className="icon" />
                        <div>
                            <h4>Total Paid</h4>
                            <span className="amount">₹{totalPaid}</span>
                        </div>
                    </div>

                    <div className="ledger-card database">
                        <FaUniversity className="icon" />
                        <div>
                            <h4>Fines Billing Rule</h4>
                            <p>₹150/Day penalty automatically applied in <b>fees db</b> for all unlogged absences.</p>
                        </div>
                    </div>
                </div>

                {/* Main Receipt Section */}
                <div className="fees-body">
                    <h3><FaReceipt /> Digital Receipts & Ledger</h3>

                    <div className="receipt-list">
                        {fees.length === 0 ? (
                            <div className="empty-receipts">
                                <FaCheckCircle style={{ color: "#22c55e", fontSize: "36px" }} />
                                <h4>You're All Clear!</h4>
                                <p>No unpaid penalties or leave fine logs found inside database.</p>
                            </div>
                        ) : (
                            fees.map((fee, idx) => (
                                <div key={fee.id || fee._id || idx} className={`receipt-item ${fee.status.toLowerCase()}`}>
                                    <div className="receipt-left">
                                        <div className="receipt-badge">
                                            <FaRupeeSign />
                                        </div>
                                        <div>
                                            <h4>{fee.reason}</h4>
                                            <p className="receipt-meta">Date: {fee.date} | ID: {fee.id || fee._id || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="receipt-right">
                                        <div className="receipt-amount-block">
                                            <span className="amount">₹{fee.amount}</span>
                                            <span className={`status-text ${fee.status.toLowerCase()}`}>{fee.status}</span>
                                        </div>
                                        
                                        {fee.status === "Unpaid" && (
                                            <button className="pay-now-btn" onClick={() => handlePayFee(fee.id || fee._id)}>
                                                <FaCreditCard /> Pay Fine
                                            </button>
                                        )}

                                        {fee.status === "Paid" && (
                                            <span className="receipt-stamp">Billed &amp; Settled</span>
                                        )}
                                    </div>
                                </div>
                              ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Fees;
