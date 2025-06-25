const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, unique: true, required: true },
  attendance: [attendanceSchema]
});

module.exports = mongoose.model("Student", studentSchema);
