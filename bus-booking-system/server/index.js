const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// ------------------------
// CONNECT TO MONGODB
// ------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// ------------------------
// IMPORT ROUTES
// ------------------------
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');  // <-- ADD THIS LINE

// ------------------------
// USE ROUTES
// ------------------------
app.use('/api/users', userRoutes);     // user register/login/get users
app.use('/api/bus', busRoutes);        // bus add/update/delete/get
app.use('/api/bookings', bookingRoutes); // <-- ADD THIS LINE (booking APIs)

// ------------------------
// TEST ROUTE
// ------------------------
app.get('/', (req, res) => {
  res.send('Bus Booking API is working');
});

// ------------------------
// START SERVER
// ------------------------
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// --- SOCKET.IO SETUP ---
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// When a client connects
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io available in routes
app.set("io", io);