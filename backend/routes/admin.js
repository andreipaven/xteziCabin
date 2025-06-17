require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Completează toate câmpurile." });
  }

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ message: "Date invalide." });
  }

  const match = await bcrypt.compare(password, ADMIN_PASSWORD);
  if (!match) {
    return res.status(401).json({ message: "Date invalide." });
  }

  const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: "5h" });
  res
    .cookie("adminToken", token, {
      httpOnly: true,
      secure: false, // set true în production (HTTPS)
      sameSite: "strict",
      maxAge: 5 * 60 * 60 * 1000, // 5h
    })
    .json({ message: "Autentificare reușită." });
});

router.get("/check-auth", (req, res) => {
  const token = req.cookies.adminToken;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Authenticated" });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
