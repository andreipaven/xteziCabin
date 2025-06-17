require("dotenv").config();
const { sendEmail } = require("./Mails/bookingMailer");

sendEmail({
  to: "gigiijvan@gmail.com",
  subject: "Test Nodemailer",
  text: "Salut! Acesta este un email de test.",
})
  .then((info) => {
    console.log("Email trimis cu succes:", info.response);
  })
  .catch((err) => {
    console.error("Eroare la trimitere email:", err);
  });
