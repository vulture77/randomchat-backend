const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration (Fixes frontend connection issues)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Allow only the frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies & authentication
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Root Route (To check if the backend is running)
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
