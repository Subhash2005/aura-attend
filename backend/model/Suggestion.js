const mongoose = require("mongoose");
const { getExploreConnection } = require("../config/db");

const suggestionSchema = new mongoose.Schema({
    name: { type: String, default: "Anonymous" },
    email: { type: String, default: "Anonymous" },
    suggestion: { type: String, required: true }
}, { timestamps: true });

module.exports = {
    getSuggestionModel: () => {
        const conn = getExploreConnection();
        if (!conn) return null;
        return conn.models.Suggestion || conn.model("Suggestion", suggestionSchema);
    },
    suggestionSchema
};
