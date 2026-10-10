const express = require('express');
const router = express.Router();

// A simple route for our services department
router.get('/', (req, res) => {
  res.send('Welcome to the Services page!');
});

module.exports = router;