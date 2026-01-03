const Leave = require("../models/Leave");

// Employee applies leave
exports.applyLeave = async (req, res) => {
  try {
    const { type, fromDate, toDate, reason, attachment } = req.body;

    // Calculate total days
    let totalDays = 1;
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end - start);
      totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const leave = await Leave.create({
      userId: req.user.id,
      type,
      fromDate,
      toDate,
      totalDays,
      reason,
      attachment,
    });

    res.json({ message: "Leave applied", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee views own leaves
exports.myLeaves = async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
};

// Admin views all leaves
exports.allLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("userId", "name employeeId");
  res.json(leaves);
};

// Admin approves / rejects leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewedAt: new Date(),
        reviewedBy: req.user.id,
      },
      { new: true }
    ).populate("userId", "name employeeId");

    // Update user status if approved/rejected
    if (status === "APPROVED" && leave.type === "UNPAID") {
      // Update attendance records for unpaid leaves
      const User = require("../models/User");
      await User.findByIdAndUpdate(leave.userId._id, {
        currentStatus: "ON_LEAVE",
      });
    }

    res.json({ message: "Leave updated", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
