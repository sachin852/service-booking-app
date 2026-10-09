const express = require('express');
const app = express();
const PORT = 5000;

// A simple route so we know the server is working
app.get('/', (req, res) => {
  res.send('Hello! Our Service Booking backend server is live!');
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running smoothly at http://localhost:${PORT}`);
});