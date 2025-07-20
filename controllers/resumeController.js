// controllers/resumeController.js
const Resume = require("../models/Resume");

exports.saveResume = async (req, res) => {
  try {
    console.log("Saving resume", req.body);
    // Pass the entire req.body as resumeData
    const newResume = new Resume({ userId: req.user.id, resumeData: req.body });
    await newResume.save().then(() => {console.log("Resume saved successfully");})
    res.status(201).json({ message: "Resume saved" });
  } catch (err) {
    console.log("Error saving resume:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

