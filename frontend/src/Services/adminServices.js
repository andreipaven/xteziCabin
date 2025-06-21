const ip = import.meta.env.VITE_URL;

export const fetchLoginAdmin = async (usernameInput, passwordInput) => {
  try {
    const response = await fetch(`https://${ip}/api/admin/login`, {
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
    if (!data.success) {
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
    const response = await fetch(`https://${ip}/api/admin/check-auth`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      return true;
    } else {
      console.log("ERROR 404 PAGE NOT FOUND!");
      return false;
    }
  } catch (error) {
    return false; // Network error, consider not logged in.
  }
};
