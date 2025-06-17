require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin");
const bookingRoutes = require("./routes/booking");
const emailRoutes = require("./routes/email");

//PORT
const app = express();
const port = process.env.PORT || 3000;

//CORS
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
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

app.listen(port, "0.0.0.0", () => {
  console.log(`The server running on http://localhost:${port}`);
});
