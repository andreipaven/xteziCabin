const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/get", async (req, res) => {
  try {
    const sql = "SELECT * FROM wedding_guests";
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
