const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

module.exports = router;
