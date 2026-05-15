import React, { useState } from "react";
import "./Auth.css";
import api from "../../api/axios";
import { Mail, Lock, User, UserCircle, ShieldCheck } from "lucide-react";

const Auth = ({ setUser, setPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAdminField, setShowAdminField] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    secretCode: "",
    childEmail: ""
  });

  // Секретний механізм відкриття поля адміна
  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 >= 3) {
      setShowAdminField(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const res = await api.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setPage("dashboard");
      } else {
        alert("Реєстрація успішна! Тепер увійдіть.");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "student",
          secretCode: "",
          childEmail: ""
        });
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Помилка операції");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Заголовок з секретним кліком */}
        <h2
          onClick={handleLogoClick}
          style={{ cursor: "default", userSelect: "none" }}
        >
          {isLogin ? "З поверненням!" : "Створити акаунт"}
        </h2>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Вхід
          </button>
          <button
            className={`tab-btn ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setShowAdminField(false);
            }}
          >
            Реєстрація
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Ваше ім'я</label>
              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Олександр"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Я реєструюсь як:</label>
              <div className="input-wrapper">
                <UserCircle size={18} />
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="student">Студент</option>
                  <option value="parent">Один з батьків</option>
                </select>
              </div>
            </div>
          )}

          {!isLogin && formData.role === "parent" && (
            <div className="form-group fade-in">
              <label>Email вашої дитини (студента)</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Введіть пошту, за якою зареєстрована дитина"
                  value={formData.childEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, childEmail: e.target.value })
                  }
                  required
                />
              </div>
              <small
                style={{ display: "block", marginTop: "5px", color: "#64748b" }}
              >
                Дитина вже має бути зареєстрована в системі як студент.
              </small>
            </div>
          )}

          {/* ПРИХОВАНЕ ПОЛЕ АДМІНА */}
          {showAdminField && (
            <div className="admin-field">
              <label style={{ color: "#ef4444" }}>
                🔑 Код доступу (Admin/Staff)
              </label>
              <div className="input-wrapper">
                <ShieldCheck size={18} color="#ef4444" />
                <input
                  type="text"
                  placeholder="Введіть секретний код"
                  onChange={(e) =>
                    setFormData({ ...formData, secretCode: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
