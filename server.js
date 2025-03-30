const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables

const app = express();

// ✅ FIXED CORS CONFIGURATION
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://randomchat-frontend.vercel.app", // Allow frontend URL
  credentials: true, // Allow cookies & auth headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allow all HTTP methods
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Allow all headers
};

app.use(cors(corsOptions)); // Enable CORS
app.options("*", cors(corsOptions)); // Handle preflight requests

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
  res.send("✅ API is running...");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
