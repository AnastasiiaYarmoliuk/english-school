const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Створити новий курс (Admin Only)
router.post('/', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: "Помилка створення курсу" });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// Оновити існуючий курс
router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: "Помилка оновлення курсу" });
  }
});

// Видалити курс
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Курс видалено" });
});

module.exports = router;
