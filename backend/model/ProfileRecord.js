const mongoose = require("mongoose");
const { getAttendanceConnection } = require("../config/db");

const profileRecordSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    department: { type: String },
    section: { type: String },
    year: { type: String },
    regNo: { type: String },
    profilePhoto: { type: String }, // Compulsory Base64 profile photo
    idCardPhoto: { type: String }, // Compulsory Base64 ID card photo
    isFakeProfile: { type: Boolean, default: false } // Biometric validation metadata
}, { timestamps: true });

module.exports = {
    getProfileModel: () => {
        const conn = getAttendanceConnection();
        if (!conn) return null;
        // Self-healing check: Force reload model if cached schema is missing idCardPhoto or isFakeProfile fields
        if (conn.models.ProfileRecord && (!conn.models.ProfileRecord.schema.paths.idCardPhoto || !conn.models.ProfileRecord.schema.paths.isFakeProfile)) {
            delete conn.models.ProfileRecord;
        }
        return conn.models.ProfileRecord || conn.model("ProfileRecord", profileRecordSchema);
    },
    profileRecordSchema
};
