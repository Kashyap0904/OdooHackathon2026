const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["PAID", "SICK", "UNPAID"],
  },
  fromDate: String,
  toDate: String,
  reason: String,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
