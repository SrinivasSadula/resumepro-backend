

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET|| "862f7961aa890b55725c35dc58b5ecd75f9d31e760bbe3bc0c16ecdb854fd80de9293b21f5eb0ce408bdce1ecfe42e05557df6ef05f5075112c1be1ce9e4bd08");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
