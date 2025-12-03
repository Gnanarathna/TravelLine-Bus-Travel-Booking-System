const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const auth = require('../middleware/auth');

// ADD BUS (Admin-only)
router.post('/add', auth, async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.send({ message: "Bus added successfully" });
  } catch (err) {
    res.status(400).send({ message: "Failed to add bus", error: err });
  }
});

// GET ALL BUSES
router.get('/', async (req, res) => {
  const buses = await Bus.find();
  res.send(buses);
});

// UPDATE BUS
router.put('/update/:id', auth, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Bus updated successfully" });
  } catch (err) {
    res.status(400).send({ message: "Failed to update bus" });
  }
});

// DELETE BUS
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.send({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: "Failed to delete bus" });
  }
});

module.exports = router;
