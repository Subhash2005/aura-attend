const mongoose = require("mongoose");
const { getAttendanceConnection } = require("../config/db");

const attendanceRecordSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true }, // college, school, company, shop
    organizationName: { type: String, required: true },
    coords: {
        lat: Number,
        lng: Number
    },
    address: { type: String },
    photo: { type: String }, // Base64 selfie
    status: { type: String, default: "Present" }, // Present, Absent, OD, Leave
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }  // HH:MM:SS
}, { timestamps: true });

module.exports = {
    getAttendanceRecordModel: () => {
        const conn = getAttendanceConnection();
        if (!conn) return null;
        return conn.models.AttendanceRecord || conn.model("AttendanceRecord", attendanceRecordSchema);
    },
    attendanceRecordSchema
};
