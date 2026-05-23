const { getUserModel } = require("../model/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const OFFLINE_DB_PATH = path.join(__dirname, "../offline_db.json");

// Helper to read offline JSON database
const getOfflineUsers = () => {
    try {
        if (!fs.existsSync(OFFLINE_DB_PATH)) {
            fs.writeFileSync(OFFLINE_DB_PATH, JSON.stringify([]));
        }
        const data = fs.readFileSync(OFFLINE_DB_PATH, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading offline DB:", err);
        return [];
    }
};

// Helper to write to offline JSON database
const saveOfflineUsers = (users) => {
    try {
        fs.writeFileSync(OFFLINE_DB_PATH, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Error writing offline DB:", err);
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, mobile, category, organizationName, role, password, roleDetails } = req.body;

        if (global.isOfflineMode) {
            const users = getOfflineUsers();
            const exists = users.find(u => u.email === email);
            if (exists) {
                return res.status(400).json({ msg: "Email already registered" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);

            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                mobile,
                category,
                organizationName,
                role,
                password: hashedPass,
                roleDetails,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            saveOfflineUsers(users);
            console.log(`[Offline Mode] Registered user: ${username}`);
            return res.status(201).json({ msg: "Registered successfully (Offline Fallback Mode)" });
        }

        const UserModel = getUserModel();
        if (!UserModel) {
            return res.status(500).json({ msg: "DB Connection not ready" });
        }

        // Check if user exists (MongoDB Mode)
        const exists = await UserModel.findOne({ email });
        if (exists) return res.status(400).json({ msg: "Email already registered" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = new UserModel({
            username,
            email,
            mobile,
            category,
            organizationName,
            role,
            password: hashedPass,
            roleDetails
        });

        await user.save();
        res.status(201).json({ msg: "Registered successfully" });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ msg: "Email or Username already registered! Please use a unique email address." });
        }
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ msg: messages.join(", ") });
        }
        res.status(500).json({ msg: err.message || "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (global.isOfflineMode) {
            const users = getOfflineUsers();
            const user = users.find(u => u.username === username);
            if (!user) {
                return res.status(400).json({ success: false, msg: "Invalid username or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, msg: "Invalid username or password" });
            }

            console.log(`[Offline Mode] Logged in user: ${username}`);
            return res.status(200).json({ success: true, username: user.username });
        }

        const UserModel = getUserModel();
        if (!UserModel) {
            return res.status(500).json({ success: false, msg: "DB Connection not ready" });
        }

        // Check if user exists by username (MongoDB Mode)
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid username or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid username or password" });
        }

        res.status(200).json({ success: true, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
