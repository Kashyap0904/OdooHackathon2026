const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, // YYYY-MM-DD
  },
  checkIn: String,
  checkOut: String,
  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "HALF_DAY", "LEAVE"],
    default: "PRESENT",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
