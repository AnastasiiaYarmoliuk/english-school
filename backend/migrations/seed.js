const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");

async function seedDB() {
  try {
    // 1. Перевіряємо, чи є вже курси в базі
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log("🌱 Починаємо наповнення бази курсів...");

      const courses = await Course.insertMany([
        {
          title: "English for Beginners (A1)",
          price: 2500,
          level: "A1",
          description: "Базовий курс для тих, хто починає з нуля.",
          lessons: [
            { topic: "Greetings", type: "Video", duration: "15 min" },
            { topic: "Numbers 1-100", type: "Quiz", points: 10 },
          ],
        },
        {
          title: "Business English (B2)",
          price: 4000,
          level: "B2",
          description: "Курс для ділового спілкування та кар'єри.",
          lessons: [
            { topic: "Meetings & Agenda", type: "Video", duration: "30 min" },
            { topic: "Business Correspondence", type: "Task", points: 20 },
          ],
        },
        {
          title: "IELTS Preparation",
          price: 5500,
          level: "C1",
          description: "Інтенсивна підготовка до міжнародного іспиту.",
          lessons: [
            { topic: "Academic Writing", type: "Video", duration: "45 min" },
            { topic: "Speaking Simulation", type: "Live Session", points: 50 },
          ],
        },
      ]);
      console.log("✅ Курси успішно додані!");
    }

    // 2. Створюємо тестових користувачів (Адмін, Студент, Батько)
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("👤 Створюємо тестових користувачів...");

      // Створюємо Адміна
      await User.create({
        name: "Головний Адмін",
        email: "admin@school.com",
        password: "admin123", // У реальному проекті тут має бути хеш
        role: "admin",
      });

      // Створюємо Студента
      const student = await User.create({
        name: "Іван Студент",
        email: "student@test.com",
        password: "password123",
        role: "student",
        level: "A1",
        balance: 2, // наприклад, 2 заняття вже оплачено
      });

      // Створюємо Батька і прив'язуємо його до студента
      await User.create({
        name: "Петро Батько",
        email: "parent@test.com",
        password: "parent123",
        role: "parent",
        childId: student._id, // Ось він, зв'язок!
      });

      console.log("✅ Користувачі додані (Admin, Student, Parent)!");
    }
  } catch (error) {
    console.error("❌ Помилка під час наповнення бази:", error);
  }
}

module.exports = seedDB;
