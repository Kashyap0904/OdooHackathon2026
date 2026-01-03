const User = require("../models/User");
const Counter = require("../models/Counter");
const bcrypt = require("bcrypt");

exports.createEmployee = async (req, res) => {
  try {
    const { companyName, name, email, phone } = req.body;

    // check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // employee ID generation
    const year = new Date().getFullYear();
    let counter = await Counter.findOne({ year });

    if (!counter) {
      counter = await Counter.create({ year, lastSerial: 0 });
    }

    counter.lastSerial += 1;
    await counter.save();

    const serial = String(counter.lastSerial).padStart(4, "0");
    const employeeId = `DF${name.slice(0, 2).toUpperCase()}${year}${serial}`;

    // auto password
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const employee = await User.create({
      companyName,
      name,
      email,
      phone,
      employeeId,
      password: hashedPassword,
      role: "EMPLOYEE",
    });

    res.json({
      message: "Employee created successfully",
      employeeId,
      password: rawPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
