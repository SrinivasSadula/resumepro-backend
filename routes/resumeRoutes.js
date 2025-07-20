// routes/resumeRoutes.js
const express = require("express");
const router = express.Router();
const { saveResume, getResumes } = require("../controllers/resumeController");
const auth = require("../middleware/authMiddleware");

router.post("/save", auth, saveResume);
router.get("/all", auth, getResumes);

module.exports = router;