const express = require('express');
const mongoose = require('mongoose'); // This brings in our database helper
require('dotenv').config(); // This loads your secret .env file
const app = express();
const PORT = process.env.PORT || 5000; // CHANGED: This tells the server to use the port from your .env file

// This lets our server read information sent by users
app.use(express.json());

// This connects your serviceRoutes file to the server
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

// A simple route so we know the server is working
app.get('/', (req, res) => {
  res.send('Hello! Our Service Booking backend server is live!');
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running smoothly at http://localhost:${PORT}`);
});