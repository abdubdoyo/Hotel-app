import express from 'express';
import Booking from '../models/Booking.js'; // import model
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create a new booking and save to MongoDB
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;

    // Optional: Calculate nights and total if not sent by client
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.round((checkOutDate - checkInDate) / msPerDay);
    bookingData.nights = nights;
    bookingData.total = nights * (bookingData.price || 0); // Make sure price is sent or handled accordingly

    // Save booking
    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings from MongoDB
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
