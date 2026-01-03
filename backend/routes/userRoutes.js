const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.put("/me", protect, async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    dateOfBirth,
    gender,
    maritalStatus,
    emergencyContact,
    profilePicture,
  } = req.body;

  const updateData = {};
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (phone !== undefined) updateData.phone = phone;
  if (address !== undefined) updateData.address = address;
  if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
  if (gender !== undefined) updateData.gender = gender;
  if (maritalStatus !== undefined) updateData.maritalStatus = maritalStatus;
  if (emergencyContact !== undefined)
    updateData.emergencyContact = emergencyContact;
  if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true }
  ).select("-password");

  res.json(user);
});

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
