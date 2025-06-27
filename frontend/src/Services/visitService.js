const ip = import.meta.env.VITE_URL;

export const fetchTrackVisit = async (body) => {
  try {
    const response = await fetch(`https://${ip}/api/visit/track-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message }
      : { success: false, message: data.message || "Unknown error" };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." };
  }
};
