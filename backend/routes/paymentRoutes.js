const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const User = require("../models/User");

// Створити оплату
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    // Автоматично додаємо баланс студенту після успішної оплати
    // Якщо платить батько, userId у запиті має бути ID студента
    await User.findByIdAndUpdate(req.body.userId, { $inc: { balance: 1 } });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Історія платежів конкретного юзера
router.get("/user/:userId", async (req, res) => {
  const history = await Payment.find({ userId: req.params.userId }).populate(
    "courseId",
  );
  res.json(history);
});

module.exports = router;
