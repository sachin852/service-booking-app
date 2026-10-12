const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' } // Can be Pending, Approved, or Completed
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);