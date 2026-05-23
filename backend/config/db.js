const mongoose = require("mongoose");

// Global flag to indicate if we are in offline fallback mode
global.isOfflineMode = false;

let exploreConnection;
let membershipConnection;
let attendanceConnection;

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB Atlas...");
        
        let uri = process.env.MONGO_URI || "";
        if (uri) {
            uri = uri.trim();
            if (uri.startsWith("MONGO_URI=")) {
                uri = uri.substring("MONGO_URI=".length).trim();
            } else if (uri.startsWith("MONGODB_URI=")) {
                uri = uri.substring("MONGODB_URI=".length).trim();
            }
        }

        // Clean URI to extract the base URL and preserve query parameters
        let baseURI = uri;
        let queryParams = "";
        const queryIndex = uri.indexOf("?");
        if (queryIndex !== -1) {
            baseURI = uri.substring(0, queryIndex);
            queryParams = uri.substring(queryIndex); // includes "?"
        }
        if (!baseURI.endsWith("/")) {
            baseURI += "/";
        }

        const options = {
            serverSelectionTimeoutMS: 3000 // 3 seconds timeout
        };

        // Construct clean URIs with preserved parameters
        const exploreURI = queryParams ? `${baseURI}explore${queryParams}` : `${baseURI}explore?appName=attend`;
        const membershipURI = queryParams ? `${baseURI}membership${queryParams}` : `${baseURI}membership?appName=attend`;
        const attendanceURI = queryParams ? `${baseURI}attendance${queryParams}` : `${baseURI}attendance?appName=attend`;

        // Establish distinct connections for "explore", "membership", and "attendance" databases
        exploreConnection = mongoose.createConnection(exploreURI, options);
        membershipConnection = mongoose.createConnection(membershipURI, options);
        attendanceConnection = mongoose.createConnection(attendanceURI, options);

        // Await connection events
        await Promise.all([
            new Promise((resolve, reject) => {
                exploreConnection.once("connected", () => {
                    console.log("Connected to database: explore");
                    resolve();
                });
                exploreConnection.once("error", reject);
            }),
            new Promise((resolve, reject) => {
                membershipConnection.once("connected", () => {
                    console.log("Connected to database: membership");
                    resolve();
                });
                membershipConnection.once("error", reject);
            }),
            new Promise((resolve, reject) => {
                attendanceConnection.once("connected", () => {
                    console.log("Connected to database: attendance");
                    resolve();
                });
                attendanceConnection.once("error", reject);
            })
        ]);

        console.log("✨ MongoDB Multi-DB Connections established successfully!");
    } catch (err) {
        console.warn("⚠️  DB Connection Error:", err.message);
        console.warn("🚀 Starting in OFFLINE/MOCK fallback mode using local file storage.");
        global.isOfflineMode = true;
    }
};

module.exports = {
    connectDB,
    getExploreConnection: () => exploreConnection,
    getMembershipConnection: () => membershipConnection,
    getAttendanceConnection: () => attendanceConnection
};
