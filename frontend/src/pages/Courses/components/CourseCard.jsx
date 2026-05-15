import React from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import api from "../../../api/axios";
import "./CoursesComponents.css";

const CourseCard = ({ course, user }) => {
  const handlePurchase = async () => {
    if (!user) {
      alert("Будь ласка, увійдіть у систему, щоб записатися на курс.");
      return;
    }

    try {
      await api.post("/payments", {
        userId: user._id,
        courseId: course._id,
        amount: course.price,
      });
      alert(`Успішно! Курс "${course.title}" додано до вашого кабінету.`);
    } catch (err) {
      alert("Помилка при оплаті. Спробуйте пізніше.");
    }
  };

  return (
    <div className="course-card">
      <div className="course-badge">{course.level} Level</div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <p>
          {course.description ||
            "Комплексна програма вивчення англійської мови з викладачем."}
        </p>

        <div className="course-features">
          <span>
            <CheckCircle size={14} color="#10b981" /> 24 уроки
          </span>
          <span>
            <CheckCircle size={14} color="#10b981" /> Сертифікат
          </span>
        </div>

        <div className="course-footer">
          <div className="course-price">{course.price} ₴</div>
          {user?.role === "parent" && (
            <button className="btn-buy" onClick={handlePurchase}>
              <BookOpen size={18} /> Оплатити
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
