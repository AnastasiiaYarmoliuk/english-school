const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// --- 1. РЕЄСТРАЦІЯ ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, secretCode, childEmail, level } =
      req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanChildEmail = childEmail ? childEmail.trim().toLowerCase() : null;

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser)
      return res.status(400).json({ message: "Email вже зайнятий" });

    let finalRole = "student";
    let childId = null;

    if (role === "admin") {
      if (secretCode !== process.env.ADMIN_LOGIN_CODE) {
        return res
          .status(403)
          .json({ message: "Невірний код доступу для адміна" });
      }
      finalRole = "admin";
    } else if (role === "teacher") {
      if (secretCode !== process.env.STAFF_REG_CODE) {
        return res
          .status(403)
          .json({ message: "Невірний секретний код для вчителя" });
      }
      finalRole = "teacher";
    } else if (role === "parent") {
      if (!cleanChildEmail) {
        return res
          .status(400)
          .json({ message: "Вкажіть email дитини для прив'язки акаунту" });
      }

      // Шукаємо дитину
      const student = await User.findOne({
        email: cleanChildEmail,
        role: "student",
      });
      if (!student) {
        return res.status(400).json({
          message:
            "Студента з такою поштою не знайдено. Перевірте правильність введення або спочатку зареєструйте дитину.",
        });
      }

      childId = student._id;
      finalRole = "parent";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: finalRole,
      level: finalRole === "student" ? level : "A1",
      childId: childId,
    });

    await newUser.save();
    res.status(201).json({ message: "Користувача створено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка реєстрації" });
  }
});

// --- 2. ВХІД ---
router.post("/login", async (req, res) => {
  try {
    const { email, password, secretCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Невірні дані" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Невірні дані" });

    // Перевірка коду адміна з .env
    if (user.role === "admin") {
      if (secretCode !== process.env.ADMIN_LOGIN_CODE) {
        return res
          .status(403)
          .json({ message: "Потрібен секретний код адміністратора!" });
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// --- 3. ДАШБОРД (Батько/Студент) ---
router.get("/:id/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Юзера не знайдено" });

    if (user.role === "parent") {
      const child = await User.findById(user.childId);
      return res.json({
        role: "parent",
        parentName: user.name,
        childData: child
          ? { name: child.name, level: child.level, balance: child.balance }
          : null,
      });
    }

    res.json({
      role: "student",
      name: user.name,
      level: user.level,
      balance: user.balance,
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка дашборду" });
  }
});

module.exports = router;
