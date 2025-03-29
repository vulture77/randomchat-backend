const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow requests from frontend
  credentials: true // Allow cookies and authentication headers
}));

app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Database connection
mongoose.set("strictQuery", false); // Fix for Mongoose deprecation warning
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app; // Export for testing if needed
