// Force unbuffered output in Windows environment
if (process.stdout._handle && process.stdout._handle.setBlocking) {
    process.stdout._handle.setBlocking(true);
}
if (process.stderr._handle && process.stderr._handle.setBlocking) {
    process.stderr._handle.setBlocking(true);
}

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

// CORS — allow Vercel frontend + localhost dev
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.FRONTEND_URL || ""
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Render health checks)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(o => origin.startsWith(o))) {
            return callback(null, true);
        }
        // Allow any vercel.app or onrender.com subdomain
        if (origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Root health-check — fixes "Cannot GET /" on Render
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Aura Attend API is running",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/explore", require("./routes/explore"));
app.use("/api/attendance", require("./routes/attendance"));

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Route not found" });
});

// Connect db and start server
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch(err => {
    console.error("Database connection failed:", err);
    // Fallback: start in offline mode
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server running (offline mode) on port " + PORT));
});
