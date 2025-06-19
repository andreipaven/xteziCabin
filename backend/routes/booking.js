const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const db = require("../db");

router.post("/add", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const validation = booking.isValid();

    if (!validation.valid) {
      return res
        .status(400)
        .json({ success: false, message: validation.errors });
    }

    const sql = `
      INSERT INTO bookings 
      (first_name, last_name, email, phone, start_date, end_date, number_peoples, price, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const values = [
      booking.firstName,
      booking.lastName,
      booking.email,
      booking.phone,
      booking.startDate,
      booking.endDate,
      booking.numberPeoples,
      booking.price,
      booking.status,
    ];

    await db.query(sql, values);

    res
      .status(201)
      .json({ success: true, message: "Rezervare trimisa cu succes." });
  } catch (err) {
    console.error("Error saving booking", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/get", async (req, res) => {
  try {
    const sql =
      "SELECT DISTINCT ON (start_date, end_date) * FROM bookings ORDER BY start_date, end_date, id_booking;\n";
    const results = await db.query(sql);

    if (!results) {
      return res.status(500).json({
        success: false,
        message: "Database error - no results returned",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No bookings found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
});

module.exports = router;
