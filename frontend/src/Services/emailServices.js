const ip = import.meta.env.VITE_URL;
const port = import.meta.env.PORT || 3000;

export const fetchSendBookingEmail = async (userEmail, messageEmail) => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/email/send-email-booking`,
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
