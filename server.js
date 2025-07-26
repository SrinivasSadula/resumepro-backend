// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI|| "mongodb+srv://sadulasrinivas1998:xBwfhz8LO6hn6S8I@resumepro.bj0c5rs.mongodb.net/?retryWrites=true&w=majority&appName=ResumePro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/payment", paymentRoutes);

app.get('/', async (req, res) => {
  res.send(`Server running on port ${PORT}`)
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

