import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  roomName: { type: String },         
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  nights: { type: Number },
  total: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
