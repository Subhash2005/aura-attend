const express = require("express");
const router = express.Router();
const {
    postAttendance,
    getAttendanceTrack,
    postOD,
    getProfile,
    saveProfile,
    postLeave,
    getLeaves,
    getFees,
    payFee,
    getGraphStats
} = require("../controllers/attendanceController");

router.post("/post", postAttendance);
router.get("/track/:username", getAttendanceTrack);
router.post("/od", postOD);

// Profile DB endpoints
router.get("/profile/:username", getProfile);
router.post("/profile", saveProfile);

// Leave DB endpoints
router.post("/leave", postLeave);
router.get("/leave/:username", getLeaves);

// Fees DB endpoints
router.get("/fees/:username", getFees);
router.post("/fees/pay", payFee);

// Dynamic Graph Stats endpoint
router.get("/graph-stats/:username", getGraphStats);

module.exports = router;
