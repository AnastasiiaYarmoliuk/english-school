const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const User = require("../models/User");

// Створити оплату
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;

    // 1. Шукаємо того, хто платить
    const payer = await User.findById(userId);

    // 2. Визначаємо, кому саме нараховувати баланс
    let targetStudentId = userId; // За замовчуванням - самому собі

    if (payer.role === "parent") {
      if (!payer.childId) {
        return res.status(400).json({ message: "У вас не прив'язана дитина!" });
      }
      targetStudentId = payer.childId; // Якщо платить батько, ціль - дитина
    }

    // 3. Створюємо запис про оплату
    const payment = new Payment({
      userId: payer._id, 
      courseId,
      amount,
      status: "success",
      gateway: "Monobank"
    });
    await payment.save();

    // 4. ОНОВЛЮЄМО БАЛАНС ДИТИНИ (або студента)
    await User.findByIdAndUpdate(targetStudentId, { $inc: { balance: 10 } });

    res
      .status(201)
      .json({ message: "Оплата успішна, баланс дитини оновлено!" });
  } catch (err) {
    res.status(500).json({ message: "Помилка оплати" });
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
