const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Course = require("../models/Course");
const Payment = require("../models/Payment");

// 1. Загальна статистика для карток
router.get("/stats", async (req, res) => {
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const activeCourses = await Course.countDocuments();
  const payments = await Payment.find({ status: "success" });
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  res.json({
    totalStudents,
    totalTeachers,
    totalRevenue,
    activeCourses,
  });
});

// 2. Керування користувачами
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ created_at: -1 });
  res.json(users);
});

router.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

router.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Користувача видалено" });
});

// 3. Керування курсами (зміна цін)
router.put("/courses/:id", async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedCourse);
});

router.get("/payments", async (req, res) => {
  const payments = await Payment.find()
    .populate("userId", "name email")
    .populate("courseId", "title")
    .sort({ date: -1 });
  res.json(payments);
});

module.exports = router;
