const mongoose = require("mongoose");
const { getMembershipConnection } = require("../config/db");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    category: { type: String, required: true },
    organizationName: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    roleDetails: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

module.exports = {
    getUserModel: () => {
        const conn = getMembershipConnection();
        if (!conn) return null;
        return conn.models.User || conn.model("User", userSchema);
    },
    userSchema
};
