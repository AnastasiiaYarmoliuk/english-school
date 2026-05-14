const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Assignment = require("../models/Assignment");
const Course = require("../models/Course");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Здача завдання
router.post(
  "/assignments/:id/submit",
  upload.single("file"),
  async (req, res) => {
    try {
      const updateData = {
        status: "submitted",
        answerText: req.body.answerText,
        submittedAt: new Date(),
      };
      if (req.file) updateData.fileName = req.file.filename;

      await Assignment.findByIdAndUpdate(req.params.id, updateData);
      res.json({ message: "Завдання успішно здано!" });
    } catch (err) {
      res.status(500).json({ message: "Помилка при здачі" });
    }
  },
);

// Отримати дані для дашборду
router.get("/:id/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Користувача не знайдено" });

    // Визначаємо, чиї дані завантажувати (самого юзера чи дитини)
    const targetId = user.role === "parent" ? user.childId : user._id;
    const student = await User.findById(targetId);

    if (!student)
      return res.status(404).json({ message: "Дані учня не знайдено" });

    // 1. Шукаємо завдання (дедлайни) учня
    const assignments = await Assignment.find({ studentId: targetId });

    // 2. Шукаємо курс учня, щоб дістати "Наступний урок"
    const course = await Course.findOne({ level: student.level });
    const nextLesson = course?.lessons.find((l) => l.type === "Live Session");

    res.json({
      profile: {
        name: student.name,
        role: student.role,
        level: student.level,
        balance: student.balance,
      },
      nextLesson: nextLesson
        ? {
            topic: nextLesson.topic,
            date: nextLesson.scheduledDate,
            duration: nextLesson.duration,
          }
        : null,
      assignments: assignments,
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка завантаження даних користувача" });
  }
});

module.exports = router;
