const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables

const app = express();

// ✅ FIX CORS ISSUE
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://yourfrontend.vercel.app",
  credentials: true,
}));

// ✅ MIDDLEWARE
app.use(express.json()); // Parse JSON request body

// ✅ ROUTES
app.use("/api/auth", authRoutes);

// ✅ CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
