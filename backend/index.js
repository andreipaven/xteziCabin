require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin");
const bookingRoutes = require("./routes/booking");
const emailRoutes = require("./routes/email");

//PORT
const app = express();
const port = process.env.PORT || 3000;

const frontendPort = process.env.FRONTEND_PORT;
const ip = process.env.MY_IP;

//CORS
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:4000",
      `https://${ip}:${frontendPort}`,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/email", emailRoutes);

//db connection

const db = require("./db");

db.connect()
  .then(() => {
    console.log("✅ Connected to the PostgreSQL database");

    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect database:", err.message);
    process.exit(1);
  });

app.get("/hia", (req, res) => {
  res.json({ status: "Backend is working!" });
});
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
