// Central API base URL — uses environment variable for production (Render)
// Falls back to localhost:5000 for local development
let rawUrl = process.env.REACT_APP_API_URL || "https://aura-attend-1.onrender.com";
const API_BASE = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

export default API_BASE;
