import express from "express";
import cors from "cors";
import roomsRoute from "./routes/rooms.js";
import bookingsRoute from "./routes/bookings.js";
import adminRoute from "./routes/admin.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ebisa-hotel")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/admin", adminRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
