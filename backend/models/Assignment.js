const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: String, // Назва завдання (копіюємо з уроку)
  dueDate: Date, // Кінцева дата (Дедлайн)
  status: {
    type: String,
    enum: ["pending", "submitted", "completed"],
    default: "pending",
    },
    answerText: String,
    fileName: String,
  grade: Number
});

module.exports = mongoose.model("Assignment", assignmentSchema);
