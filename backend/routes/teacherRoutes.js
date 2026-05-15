const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");


// 1. Отримати всі надіслані завдання, які ще не перевірені
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await Assignment.find({ status: "submitted" })
      .populate("studentId", "name email")
      .populate("courseId", "title");
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Помилка завантаження ДЗ" });
  }
});

// 2. Виставити оцінку за завдання
router.patch("/assignments/:id/grade", async (req, res) => {
  try {
    const { grade } = req.body;
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      { grade, status: "graded" },
      { new: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Помилка виставлення оцінки" });
  }
});

// 3. Отримати список усіх студентів для вчителя
router.get("/students", async (req, res) => {
  const students = await User.find({ role: "student" }).select(
    "name email level balance",
  );
  res.json(students);
});

// Призначити нове завдання студенту
router.post('/assignments', async (req, res) => {
  try {
    const { studentId, title, dueDate } = req.body;

    const student = await User.findById(studentId);
    if (!student)
      return res.status(404).json({ message: "Студента не знайдено" });

    // 2. Автоматично знаходимо курс, який відповідає рівню студента
    const course = await Course.findOne({ level: student.level });
    if (!course)
      return res
        .status(404)
        .json({ message: "Для цього рівня ще не створено курсу" });

    // 3. Створюємо завдання з реальним ID курсу
    const newAssignment = new Assignment({
      studentId,
      courseId: course._id, // Беремо реальний ID з бази
      title,
      dueDate,
      status: "pending",
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Помилка при створенні завдання" });
  }
});

module.exports = router;
