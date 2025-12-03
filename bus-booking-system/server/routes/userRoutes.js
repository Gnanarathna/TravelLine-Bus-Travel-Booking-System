const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { OAuth2Client } = require("google-auth-library");

// Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT function
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

// ----------------------
// REGISTER
// ----------------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ message: "Email already exists" });

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

// ----------------------
// LOGIN
// ----------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Incorrect password" });

    const token = generateToken(user);

    res.send({
      message: "Login successful",
      token,
      user
    });
  } catch (err) {
    res.status(400).send({ message: "Login failed", error: err });
  }
});

// ----------------------
// GOOGLE LOGIN
// ----------------------
router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });

    // If new Google user → create user
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth",
        role: "passenger",
      });
    }

    // Create JWT token
    const userToken = generateToken(user);

    res.send({
      message: "Google Login Successful",
      user,
      token: userToken,
    });

  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Google login failed", error: err });
  }
});

// ----------------------
// GET ALL USERS (Protected)
// ----------------------
router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// ----------------------
// UPDATE USER
// ----------------------
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

// ----------------------
// DELETE USER
// ----------------------
router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.send({ message: "User account deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: "Failed to delete user", error: err });
  }
});

module.exports = router;
