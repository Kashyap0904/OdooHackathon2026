const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const { createEmployee } = require("../controllers/adminController");

router.post("/create-employee", protect, isAdmin, createEmployee);

module.exports = router;
