const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Video", "Quiz", "Task", "Live Session"],
    default: "Task",
  },
  duration: String,
  points: Number,
  link: String,
});

const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    level: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    lessons: [lessonSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
