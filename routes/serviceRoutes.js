const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // This brings in your new blueprint

// 1. GET: This retrieves all services from the database
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(); // Asks MongoDB for all saved services
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: This adds a brand new service to the database
router.post('/', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    duration: req.body.duration,
    category: req.body.category
  });

  try {
    const newService = await service.save(); // Saves the new service to MongoDB
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;