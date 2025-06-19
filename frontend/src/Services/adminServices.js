const ip = import.meta.env.DB_HOST;
const port = import.meta.env.PORT || 3000;

export const fetchLoginAdmin = async (usernameInput, passwordInput) => {
  try {
    const response = await fetch(`https://${ip}:${port}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
      credentials: "include", // IMPORTANT for cookie-uri httpOnly
    });
    const data = await response.json();
    if (!response.ok) {
      // Login failed
      return { success: false, message: data.message };
    } else {
      // Login successfully
      return { success: true };
    }
  } catch (e) {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const fetchCheckAdmin = async () => {
  try {
    const response = await fetch(`https://${ip}:${port}/api/admin/check-auth`, {
      method: "GET",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    return false; // Network error, consider not logged in.
  }
};
