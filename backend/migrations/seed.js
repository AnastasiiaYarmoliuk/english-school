const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");

async function seedDB() {
  try {
    // 1. Очищення бази перед наповненням (щоб уникнути дублікатів при перезапуску)
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignment.deleteMany({});
    console.log("🗑️  Base cleared");

    // 2. Хешування паролів (Вимога SEC-3)
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash("admin123", salt);
    const studentPass = await bcrypt.hash("password123", salt);
    const parentPass = await bcrypt.hash("parent123", salt);

    // 3. Створення користувачів
    console.log("👤 Seeding users...");

    // Створюємо Студента
    const student = await User.create({
      name: "Іван Студент",
      email: "student@test.com",
      password: studentPass,
      role: "student",
      level: "B1",
      balance: 12,
    });

    // Створюємо Батька (прив'язуємо до студента Івана)
    await User.create({
      name: "Петро Батько",
      email: "parent@test.com",
      password: parentPass,
      role: "parent",
      childId: student._id, // Зв'язок
    });

    // Створюємо Адміна
    await User.create({
      name: "Головний Адмін",
      email: "admin@school.com",
      password: adminPass,
      role: "admin",
    });

    // 4. Створення курсів та уроків (вбудовані в курс)
    console.log("📚 Seeding courses...");
    const courses = await Course.insertMany([
      {
        title: "Intermediate English (B1)",
        level: "B1",
        price: 3200,
        description:
          "Курс для тих, хто хоче вільно спілкуватися на повсякденні теми.",
        lessons: [
          {
            topic: "Business Correspondence",
            type: "Video",
            duration: "30 min",
          },
          {
            topic: "Present Perfect & Business Idioms",
            type: "Live Session",
            duration: "60 хв",
            scheduledDate: new Date(new Date().getTime() + 86400000), // Завтра
          },
        ],
      },
      {
        title: "Business English (B2)",
        level: "B2",
        price: 4500,
        description: "Професійна англійська для кар'єрного росту.",
        lessons: [
          {
            topic: "Meetings & Negotiations",
            type: "Live Session",
            duration: "90 хв",
            scheduledDate: new Date(),
          },
        ],
      },
      {
        title: "IELTS Preparation",
        level: "C1",
        price: 6000,
        description: "Інтенсивна підготовка до міжнародного іспиту.",
        lessons: [],
      },
    ]);

    // 5. Створення дедлайнів (Завдань)
    console.log("⏳ Seeding assignments...");
    await Assignment.insertMany([
      {
        studentId: student._id,
        courseId: courses[0]._id,
        title: "Grammar Quiz: Past Tenses",
        dueDate: new Date(new Date().getTime() + 86400000 * 2), // Через 2 дні
        status: "pending",
      },
      {
        studentId: student._id,
        courseId: courses[0]._id,
        title: "Essay: My Future Career",
        dueDate: new Date(new Date().getTime() + 86400000 * 5), // Через 5 днів
        status: "pending",
      },
      {
        studentId: student._id,
        courseId: courses[0]._id,
        title: "Listening: Unit 4",
        dueDate: new Date(new Date().getTime() - 86400000), // Вчора (протерміновано)
        status: "pending",
      },
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seed error:", error);
  }
}

module.exports = seedDB;
