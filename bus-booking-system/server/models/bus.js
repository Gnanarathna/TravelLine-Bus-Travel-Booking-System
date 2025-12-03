const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true }
});

module.exports = mongoose.model('Bus', busSchema);
