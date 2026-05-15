const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const path = require("path");

const fs = require("fs");
const uploadDir = path.join(process.cwd(), "uploads"); // шлях до папки

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Отримати дані для дашборду
router.get("/:id/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Користувача не знайдено" });

    // 1. ПЕРЕВІРКА ДЛЯ БАТЬКІВ (Перевіряємо childId ДО пошуку студента)
    if (user.role === "parent" && !user.childId) {
      return res.json({
        profile: { name: user.name, role: user.role },
        message:
          "Будь ласка, прив'яжіть акаунт дитини (зверніться до адміністратора)",
        assignments: [], // Повертаємо порожній список, щоб фронтенд не ламався
      });
    }

    // 2. Визначаємо цільового студента
    const targetId = user.role === "parent" ? user.childId : user._id;
    const student = await User.findById(targetId);

    if (!student)
      return res
        .status(404)
        .json({ message: "Дані студента не знайдено в базі" });

    // 3. Шукаємо всі завдання
    const assignments = await Assignment.find({ studentId: targetId }).sort({
      dueDate: 1,
    });

    // 4. Рахуємо прогрес (тільки завершені/оцінені завдання)
    const course = await Course.findOne({ level: student.level });

    // Якщо в базі немає курсу для такого рівня, ставимо дефолтні значення
    const totalLessons = course?.lessons?.length || 10;
    const completedLessons = assignments.filter(
      (a) => a.status === "graded",
    ).length;

    // 5. Шукаємо найближчий Live-урок
    const nextLesson = course?.lessons?.find((l) => l.type === "Live Session");

    // 6. ПОВЕРТАЄМО ДАНІ
    res.json({
      profile: {
        name: student.name,
        role: student.role,
        level: student.level,
        balance: student.balance,
        completedModules: completedLessons,
        totalModules: totalLessons,
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
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Внутрішня помилка сервера" });
  }
});
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

      const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true },
      );

      if (!updatedAssignment) {
        return res.status(404).json({ message: "Завдання не знайдено" });
      }

      res.json({
        message: "Завдання успішно здано!",
        assignment: updatedAssignment,
      });
    } catch (err) {
      console.error("Помилка Multer/DB:", err);
      res.status(500).json({ message: "Помилка при здачі завдання" });
    }
  },
);
module.exports = router;
