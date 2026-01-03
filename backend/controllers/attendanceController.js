const Attendance = require("../models/Attendance");

// Employee Check-in
exports.checkIn = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const exists = await Attendance.findOne({
    userId: req.user.id,
    date: today,
  });

  if (exists) {
    return res.status(400).json({ message: "Already checked in" });
  }

  const attendance = await Attendance.create({
    userId: req.user.id,
    date: today,
    checkIn: new Date().toLocaleTimeString(),
    status: "PRESENT",
  });

  res.json(attendance);
};

// Employee Check-out
exports.checkOut = async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const attendance = await Attendance.findOne({
    userId: req.user.id,
    date: today,
  });

  if (!attendance) {
    return res.status(400).json({ message: "Check-in first" });
  }

  attendance.checkOut = new Date().toLocaleTimeString();
  await attendance.save();

  res.json(attendance);
};

// Employee View Own Attendance
exports.myAttendance = async (req, res) => {
  const data = await Attendance.find({ userId: req.user.id });
  res.json(data);
};

// Admin View All Attendance
exports.allAttendance = async (req, res) => {
  const data = await Attendance.find().populate("userId", "name employeeId");
  res.json(data);
};
