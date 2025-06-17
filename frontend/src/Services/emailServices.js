require("dotenv").config();
const port = process.env.PORT || 3000;
const ip = process.env.MY_IP;

export const fetchSendBookingEmail = async (userEmail, messageEmail) => {
  try {
    const response = await fetch(
      `https://${ip}:${port}/api/email/send-email-booking`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: userEmail,
          subject: "Confirmare rezervare",
          text: messageEmail,
        }),
      },
    );

    const data = await response.json();
    return response.ok
      ? {
          success: true,
          message: "Email sent successfully",
        }
      : { success: false, message: data.message };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Network error. Please try again. " + error,
    };
  }
};
