// controllers/resumeController.js
const Resume = require("../models/Resume");

exports.saveResume = async (req, res) => {
  try {
    console.log("Saving resume", req.body);
    console.log("Saving resume for user:", req.user.id);
    await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { userId: req.user.id, resumeData: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("Resume saved/upserted successfully");
    res.status(201).json({ message: "Resume saved/upserted" });
  } catch (err) {
    console.log("Error saving resume:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getResumes = async (req, res) => {
  try {
    console.log("Fetching resume for user:", req.user.id);
    const resume = await Resume.findOne({ userId: req.user.id });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

