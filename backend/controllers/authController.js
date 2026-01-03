const User = require("../models/User");
const Counter = require("../models/Counter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const {
      companyName,
      firstName,
      lastName,
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const year = new Date().getFullYear();
    let counter = await Counter.findOne({ year });

    if (!counter) counter = await Counter.create({ year, lastSerial: 0 });
    counter.lastSerial += 1;
    await counter.save();

    const employeeName = firstName || name || "Employee";
    const serial = String(counter.lastSerial).padStart(4, "0");
    const employeeId = `DF${employeeName.slice(0, 2).toUpperCase()}${year}${serial}`;

    // Use provided password or generate one
    const rawPassword = password || Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = await User.create({
      employeeId,
      companyName,
      firstName,
      lastName,
      name: firstName && lastName ? `${firstName} ${lastName}` : name,
      email,
      phone,
      password: hashedPassword,
      role: role || "EMPLOYEE",
    });

    res.json({
      message: "Sign up successful",
      employeeId,
      password: password ? undefined : rawPassword, // Only return if auto-generated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "DAYFLOW_SECRET",
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
