const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Отримати список курсів
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Створити курс (тільки для адміна)
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Видалити курс
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Курс видалено" });
});

module.exports = router;
