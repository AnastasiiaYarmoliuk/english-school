import React from "react";
import "./Home.css";
import { ArrowRight, BookOpen, Globe, ShieldCheck, Zap } from "lucide-react";

const Home = ({ setPage }) => {
  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge" style={{ marginBottom: "15px" }}>
            ✨ Твій шлях до вільної англійської
          </div>
          <h1>
            Опануй англійську <span>впевнено</span> та легко
          </h1>
          <p>
            Сучасна онлайн-платформа з персоналізованим підходом,
            кваліфікованими викладачами та автоматичним контролем прогресу.
          </p>
            <button className="btn-primary" onClick={() => setPage("courses")}>
              Переглянути курси <ArrowRight size={20} />
            </button>
        </div>

        <div className="hero-image">
          {/* Можна додати картинку або абстрактну фігуру */}
          <div
            className="figure"
            style={{
              width: "350px",
              height: "350px",
              background: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              boxShadow: "0 50px 100px -20px rgba(79, 70, 229, 0.4)",
            }}
          ></div>
        </div>
      </section>

      {/* ПЕРЕВАГИ */}
      <section className="features-section">
        <h2>Чому обирають EngSchool?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box">
              <Globe size={28} />
            </div>
            <h3>Доступ звідусіль</h3>
            <p>Навчайся вдома, в офісі чи в подорожі з будь-якого пристрою.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box">
              <Zap size={28} />
            </div>
            <h3>Швидкий прогрес</h3>
            <p>Методика, орієнтована на розмовну практику з першого заняття.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box">
              <ShieldCheck size={28} />
            </div>
            <h3>Батьківський контроль</h3>
            <p>
              Прозорі звіти про успішність та оплати для батьків у реальному
              часі.
            </p>
          </div>
        </div>
      </section>

      {/* ЗАКЛИК ДО ДІЇ */}
      <section
        style={{
          padding: "80px 8%",
          background: "#4f46e5",
          color: "white",
          borderRadius: "40px",
          margin: "40px 8%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white" }}>Готові почати навчання?</h2>
        <p style={{ opacity: 0.9, marginBottom: "30px" }}>
          Приєднуйтесь до 1000+ задоволених студентів вже сьогодні.
        </p>
        <button
          className="btn-primary"
          style={{ background: "white", color: "#4f46e5" }}
          onClick={() => setPage("courses")}
        >
          Обрати свій рівень
        </button>
      </section>
    </div>
  );
};

export default Home;
