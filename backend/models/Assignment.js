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
  title: String, 
  dueDate: Date, 
  status: {
    type: String,
    enum: ["pending", "submitted", "completed", "graded"],
    default: "pending",
    },
    answerText: String,
    fileName: String,
  grade: Number
});

module.exports = mongoose.model("Assignment", assignmentSchema);
