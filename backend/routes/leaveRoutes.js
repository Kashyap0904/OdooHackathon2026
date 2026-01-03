const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  applyLeave,
  myLeaves,
  allLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

router.post("/apply", protect, applyLeave);
router.get("/my", protect, myLeaves);

router.get("/all", protect, isAdmin, allLeaves);
router.put("/:id", protect, isAdmin, updateLeaveStatus);

module.exports = router;
