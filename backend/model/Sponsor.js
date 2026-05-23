const mongoose = require("mongoose");
const { getExploreConnection } = require("../config/db");

const sponsorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true }
}, { timestamps: true });

module.exports = {
    getSponsorModel: () => {
        const conn = getExploreConnection();
        if (!conn) return null;
        return conn.models.Sponsor || conn.model("Sponsor", sponsorSchema);
    },
    sponsorSchema
};
