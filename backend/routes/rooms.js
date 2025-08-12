import express from "express";
import { rooms } from "../data/rooms.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(rooms);
});

export default router;
