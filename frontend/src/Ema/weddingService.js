const ip = import.meta.env.VITE_URL;

export const fetchGetWeddingGuests = async () => {
  try {
    const response = await fetch(`https://${ip}/api/wedding/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
