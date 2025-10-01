const express = require("express");
const router = express.Router();
const { sendEmail } = require("../Mails/bookingMailer");

router.post("/send-email-booking", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const info = await sendEmail({ to, subject, text });
    console.log("Email send:", info.response);
    res.status(200).json({ message: "Email trimis cu succes" });
  } catch (error) {
    console.error("Error to sent email:", error);
    res.status(500).send("Error to sent email!" + error);
  }
});

module.exports = router;
