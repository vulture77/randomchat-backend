const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables

const app = express();

// ✅ CORS CONFIGURATION - Fixes XHR CORS Issues
const allowedOrigins = [
  "https://randomchat-frontend.vercel.app", // ✅ Your actual frontend URL
  "http://localhost:3000" // ✅ Allow local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies & auth headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS settings
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
  res.send("API is running...");
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
