const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  addStudent,
  markAttendance,
  getAttendancePercentage
} = require("../controllers/attendanceController.js");

// 🔹 Route to add a student
router.post("/student", addStudent);

// 🔹 Route to mark attendance
router.post("/mark", markAttendance);

// 🔹 Route to get attendance percentage
router.get("/percentage/:rollNumber", getAttendancePercentage);

// Export the router to use in app.js
module.exports = router;
