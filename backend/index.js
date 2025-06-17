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
      `https://${ip}:${frontendPort}`,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});
// routes
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/email", emailRoutes);

const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`The server running on https://${ip}:${port}`);
});
