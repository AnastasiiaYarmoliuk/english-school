global.crypto = require("crypto");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const seedDB = require("./migrations/seed");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Підключення маршрутів
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);

const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const mongoURI = process.env.MONGO_URI || "mongodb://db:27017/english_school";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedDB();
  })
  .catch((err) => console.error("❌ Connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
