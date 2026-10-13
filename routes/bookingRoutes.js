const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

// POST: Save a new customer booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET: Fetch all bookings for the Admin Dashboard
router.get('/', async (req, res) => {
  try {
    // .populate() also fetches the service title and price attached to this booking!
    const bookings = await Booking.find().populate('serviceId', 'title price');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PUT: Update a booking's status
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true } // Returns the updated document
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE: Remove a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;