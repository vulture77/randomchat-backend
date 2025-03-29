const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Stronger password hashing with 12 salt rounds
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT Token with expiry time
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, email: user.email });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
