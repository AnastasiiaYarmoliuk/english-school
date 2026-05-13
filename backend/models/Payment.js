const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  // Хто здійснив оплату (Студент або Батько)
  // Використовуємо ObjectId для зв'язку з моделлю User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // За який курс здійснена оплата
  // Зв'язок з моделлю Course
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ["UAH", "USD", "EUR"],
    default: "UAH",
  },
  status: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending",
  },
  gateway: {
    type: String,
    enum: ["Monobank", "LiqPay", "Stripe", "PayPal"],
    default: "Monobank",
  },
  transactionId: {
    type: String,
  },
  description: {
    type: String,
    default: "Оплата за навчання в онлайн-школі",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
