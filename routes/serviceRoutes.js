const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// 1. GET: Fetch all active services from MongoDB
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching services', error: error.message });
  }
});

// 2. POST: Add a new service to MongoDB
router.post('/', async (req, res) => {
  try {
    const { title, description, price, duration, category } = req.body;

    const newService = new Service({
      title,
      description,
      price,
      duration,
      category
    });

    const savedService = await newService.save();
    res.status(201).json({ message: 'Service created successfully!', savedService });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create service', error: error.message });
  }
});

module.exports = router;