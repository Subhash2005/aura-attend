const mongoose = require("mongoose");
const { getAttendanceConnection } = require("../config/db");

const odRecordSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    organizationName: { type: String, required: true },
    location: { type: String, required: true },
    days: { type: Number, required: true },
    reason: { type: String, required: true },
    selfie: { type: String }, // Base64
    proof: { type: String }   // Base64 or text proof
}, { timestamps: true });

module.exports = {
    getODRecordModel: () => {
        const conn = getAttendanceConnection();
        if (!conn) return null;
        return conn.models.ODRecord || conn.model("ODRecord", odRecordSchema);
    },
    odRecordSchema
};
