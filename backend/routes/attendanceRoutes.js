const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  checkIn,
  checkOut,
  myAttendance,
  allAttendance,
} = require("../controllers/attendanceController");

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);
router.get("/my", protect, myAttendance);
router.get("/all", protect, isAdmin, allAttendance);

module.exports = router;
