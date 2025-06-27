const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/track-visit", async (req, res) => {
  const { visitor_id, visit_date } = req.body;

  if (!visitor_id || !visit_date) {
    return res
      .status(400)
      .json({ error: "visitor_id and visit_date are required" });
  }

  try {
    const query = ` INSERT INTO daily_visits (visitor_id, visit_date)  VALUES ($1, $2) ON CONFLICT (visitor_id, visit_date) DO NOTHING RETURNING *; `;
    const result = await db.query(query, [visitor_id, visit_date]);

    if (result.rows.length > 0) {
      res.status(201).json({ message: "Visit recorded" });
    } else {
      res.status(200).json({ message: "Visit already recorded for today" });
    }
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
