const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "https://yourfrontend.vercel.app", // ✅ Allow frontend access
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));
// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




