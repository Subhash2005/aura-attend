const mongoose = require("mongoose");
const { getAttendanceConnection } = require("../config/db");

const feeRecordSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    organizationName: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, default: "Unpaid" } // Paid, Unpaid
}, { timestamps: true });

module.exports = {
    getFeeRecordModel: () => {
        const conn = getAttendanceConnection();
        if (!conn) return null;
        return conn.models.FeeRecord || conn.model("FeeRecord", feeRecordSchema);
    },
    feeRecordSchema
};
