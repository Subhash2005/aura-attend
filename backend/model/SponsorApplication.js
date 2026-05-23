const mongoose = require("mongoose");
const { getExploreConnection } = require("../config/db");

const sponsorApplicationSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    hrContact: { type: String, required: true },
    ownerName: { type: String, required: true },
    cin: { type: String, required: true },
    gst: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    productDetails: { type: String, required: true },
    companyMotto: { type: String, required: true }
}, { timestamps: true });

module.exports = {
    getSponsorApplicationModel: () => {
        const conn = getExploreConnection();
        if (!conn) return null;
        return conn.models.SponsorApplication || conn.model("SponsorApplication", sponsorApplicationSchema);
    },
    sponsorApplicationSchema
};
