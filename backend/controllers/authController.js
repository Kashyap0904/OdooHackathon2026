const User = require("../models/User");
const Counter = require("../models/Counter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { companyName, name, email, phone, role } = req.body;

  const year = new Date().getFullYear();
  let counter = await Counter.findOne({ year });

  if (!counter) counter = await Counter.create({ year, lastSerial: 0 });
  counter.lastSerial += 1;
  await counter.save();

  const serial = String(counter.lastSerial).padStart(4, "0");
  const employeeId = `DF${name.slice(0, 2).toUpperCase()}${year}${serial}`;

  const rawPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await User.create({
    employeeId,
    companyName,
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  res.json({ employeeId, password: rawPassword });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: user.role }, "DAYFLOW_SECRET", {
    expiresIn: "1d",
  });

  res.json({ token, role: user.role });
};
