const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const Payment = require("../models/Payment");

async function seedDB() {
  try {
    // 1. Повне очищення бази
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignment.deleteMany({});
    await Payment.deleteMany({});
    console.log("🗑️  Database cleared");

    // 2. Генерація солі для хешування
    const salt = await bcrypt.genSalt(10);

    // 3. СТВОРЕННЯ КОРИСТУВАЧІВ
    console.log("👤 Seeding users...");

    // Адмін
    const adminPass = await bcrypt.hash("admin123", salt);
    await User.create({
      name: "Головний Адмін",
      email: "admin@school.com",
      password: adminPass,
      role: "admin",
    });

    // Вчитель
    const teacherPass = await bcrypt.hash("teacher123", salt);
    const teacher = await User.create({
      name: "Олена Вікторівна",
      email: "teacher@school.com",
      password: teacherPass,
      role: "teacher",
    });

    // Студент
    const studentPass = await bcrypt.hash("password123", salt);
    const student = await User.create({
      name: "Микола Студент",
      email: "student@test.com",
      password: studentPass,
      role: "student",
      level: "B1",
      balance: 5, // Вже має оплачені заняття
    });

    // Батько (Прив'язаний до Миколи)
    const parentPass = await bcrypt.hash("parent123", salt);
    await User.create({
      name: "Петро Батько",
      email: "parent@test.com",
      password: parentPass,
      role: "parent",
      childId: student._id,
    });

    // 4. СТВОРЕННЯ КУРСІВ
    console.log("📚 Seeding courses...");
    const courses = await Course.insertMany([
      {
        title: "Intermediate English (B1)",
        level: "B1",
        price: 3200,
        description: "Курс для впевненого спілкування.",
        lessons: [
          {
            topic: "Present Perfect vs Past Simple",
            type: "Live Session",
            duration: "60 хв",
            scheduledDate: new Date(new Date().getTime() + 86400000), // Завтра
          },
          {
            topic: "Business Email Writing",
            type: "Video",
            duration: "25 min",
          },
        ],
      },
      {
        title: "Upper-Intermediate (B2)",
        level: "B2",
        price: 4500,
        description: "Професійна англійська для роботи.",
        lessons: [],
      },
    ]);

    // 5. СТВОРЕННЯ ЗАВДАНЬ (ДЛЯ РІЗНИХ СТАНІВ)
    console.log("⏳ Seeding assignments...");
    await Assignment.insertMany([
      {
        title: "Grammar Quiz: Unit 1",
        studentId: student._id,
        courseId: courses[0]._id,
        dueDate: new Date(new Date().getTime() + 172800000), // Через 2 дні
        status: "pending", // Студент побачить у "Дедлайнах"
      },
      {
        title: "Essay: My Goals",
        studentId: student._id,
        courseId: courses[0]._id,
        dueDate: new Date(),
        status: "submitted", // Вчитель побачить у черзі на перевірку
        fileName: "demo-essay.pdf",
        answerText: "I want to learn English to travel more.",
      },
      {
        title: "Vocabulary Test",
        studentId: student._id,
        courseId: courses[0]._id,
        dueDate: new Date(),
        status: "graded", // Студент побачить результат
        grade: 95,
      },
    ]);

    // 6. СТВОРЕННЯ ТЕСТОВОЇ ОПЛАТИ (ДЛЯ БАТЬКІВ)
    await Payment.create({
      userId: student._id,
      courseId: courses[0]._id,
      amount: 3200,
      status: "success",
      gateway: "Monobank",
      date: new Date(),
    });

    console.log("✅ ALL SYSTEMS GO: Database fully seeded!");
  } catch (error) {
    console.error("❌ Seed error:", error);
  }
}

module.exports = seedDB;
