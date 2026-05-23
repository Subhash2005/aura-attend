const mongoose = require("mongoose");
const { getExploreConnection } = require("../config/db");

const organizationSchema = new mongoose.Schema({
    category: { type: String, required: true }, // 'colleges', 'schools', 'companies', 'shops'
    name: { type: String, required: true },
    logo: { type: String, default: "" }
}, { timestamps: true });

module.exports = {
    getOrganizationModel: () => {
        const conn = getExploreConnection();
        if (!conn) return null;
        return conn.models.Organization || conn.model("Organization", organizationSchema);
    },
    organizationSchema
};
