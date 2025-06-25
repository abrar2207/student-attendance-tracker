const Student = require("../models/student");

// 🔹 Create student
exports.addStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    const student = new Student({ name, rollNumber });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { rollNumber, date, status } = req.body;
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Prevent duplicate entries for same date
    const alreadyMarked = student.attendance.find(a => a.date === date);
    if (alreadyMarked) return res.status(400).json({ error: "Already marked for this date" });

    student.attendance.push({ date, status });
    await student.save();
    res.json({ message: "Attendance marked", student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Get Attendance %
exports.getAttendancePercentage = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber });

    if (!student) return res.status(404).json({ error: "Student not found" });

    const total = student.attendance.length;
    const present = student.attendance.filter(a => a.status === "Present").length;
    const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    res.json({ name: student.name, rollNumber, percentage: `${percentage}%` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
