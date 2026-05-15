var express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment');

/* POST: Create a new booking */
router.post('/book', async function(req, res, next) {
  try {
    const booking = new Appointment(req.body);
    await booking.save();
    res.status(201).json({ success: true, message: "Appointment Booked!", data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* GET: View all bookings (for your dashboard later) */
router.get('/all', async function(req, res) {
  const data = await Appointment.find();
  res.json(data);
});

module.exports = router;