const mongoose = require("mongoose");
const { getAttendanceConnection } = require("../config/db");

const leaveRecordSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    organizationName: { type: String, required: true },
    startDate: { type: String, required: true }, // YYYY-MM-DD
    endDate: { type: String, required: true },   // YYYY-MM-DD
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" } // Pending, Approved, Rejected
}, { timestamps: true });

module.exports = {
    getLeaveRecordModel: () => {
        const conn = getAttendanceConnection();
        if (!conn) return null;
        return conn.models.LeaveRecord || conn.model("LeaveRecord", leaveRecordSchema);
    },
    leaveRecordSchema
};
