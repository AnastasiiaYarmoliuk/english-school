const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Щоб розуміти JSON у запитах

// ПІДКЛЮЧЕННЯ ДО БД (Важливо: для Docker використовуємо назву сервісу 'db')
const mongoURI = process.env.MONGO_URI || "mongodb://db:27017/english_school";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection error:", err));

// МАРШРУТИ (Твої ендпоінти з Лаби 4)
const Course = require("./models/Course");

// Отримати всі курси
app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
