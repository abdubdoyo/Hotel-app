import express from "express";
import jwt from "jsonwebtoken";
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from "../config.js";

const router = express.Router();


router.post("/login", (req, res) => {
  console.log("Admin login attempt:", req.body);
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
