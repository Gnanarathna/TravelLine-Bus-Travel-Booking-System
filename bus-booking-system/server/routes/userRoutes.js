const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "passenger"
    });

    await user.save();
    res.send({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send({ message: "Registration failed", error: err });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "2h" }
    );

    res.send({ message: "Login successful", token });
  } catch (err) {
    res.status(400).send({ message: "Login failed", error: err });
  }
});

// GET ALL USERS (PROTECTED)
router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// UPDATE USER PROFILE
router.put('/update', auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );
    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).send({ message: "Failed to update user", error: err });
  }
});

// DELETE USER ACCOUNT
router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.send({ message: "User account deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: "Failed to delete user", error: err });
  }
});

module.exports = router;
