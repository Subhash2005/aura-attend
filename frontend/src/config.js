// Central API base URL — uses environment variable for production (Render)
// Falls back to localhost:5000 for local development
const API_BASE = process.env.REACT_APP_API_URL || "https://aura-attend-1.onrender.com";

export default API_BASE;
