const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Bus = require('../models/bus');
const auth = require('../middleware/auth');

// BOOK SEATS
router.post('/book', auth, async (req, res) => {
  try {
    const { busId, seats } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).send({ message: "Bus not found" });

    if (bus.availableSeats < seats) {
      return res.status(400).send({ message: "Not enough seats available" });
    }

    bus.availableSeats -= seats;
    await bus.save();

    const booking = new Booking({
      userId: req.user.id,
      busId,
      seats,
      date: bus.date
    });

    await booking.save();

    // --- WEBSOCKET BROADCAST (NEWLY ADDED) ---
    const io = req.app.get("io");
    io.emit("seat_update", {
      busId,
      seatsBooked: seats,
      message: `User booked ${seats} seat(s) on bus ${bus.busNumber}`
    });

    res.send({ message: "Booking successful", booking });

  } catch (err) {
    res.status(500).send({ message: "Booking failed", error: err });
  }
});

// GET USER BOOKINGS
router.get('/my-bookings', auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.send(bookings);
});

// UPDATE BOOKING (Change seat count)
router.put('/update/:id', auth, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { seats } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).send({ message: "Booking not found" });

    const bus = await Bus.findById(booking.busId);

    const difference = seats - booking.seats;

    if (difference > 0 && bus.availableSeats < difference) {
      return res.status(400).send({ message: "Not enough seats available" });
    }

    bus.availableSeats -= difference;
    await bus.save();

    booking.seats = seats;
    await booking.save();

    res.send({ message: "Booking updated successfully", booking });

  } catch (err) {
    res.status(400).send({ message: "Failed to update booking", error: err });
  }
});

// DELETE BOOKING (Cancel booking)
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send({ message: "Booking not found" });

    const bus = await Bus.findById(booking.busId);

    bus.availableSeats += booking.seats;
    await bus.save();

    await Booking.findByIdAndDelete(req.params.id);

    res.send({ message: "Booking canceled successfully" });

  } catch (err) {
    res.status(400).send({ message: "Failed to cancel booking", error: err });
  }
});

module.exports = router;
