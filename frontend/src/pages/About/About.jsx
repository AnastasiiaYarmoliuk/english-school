import React from "react";
import "./About.css";
import { Users, Award, Smile, BookOpenCheck, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="about-page fade-in">
      {/* HERO */}
      <section className="about-hero">
        <h1>
          Ми робимо англійську <br /> вашою рідною мовою
        </h1>
        <p>
          EngSchool — це не просто курси. Це екосистема, де технології
          зустрічаються з персоналізованим підходом до кожного учня.
        </p>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stat-box">
          <span className="stat-number">1200+</span>
          <span className="stat-label">Студентів</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">45</span>
          <span className="stat-label">Викладачів</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">98%</span>
          <span className="stat-label">Успішних іспитів</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">10+</span>
          <span className="stat-label">Років досвіду</span>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-content">
        <div className="about-text">
          <h2>Наша місія</h2>
          <p>
            Ми віримо, що знання мови відкриває кордони. Наша мета — надати
            кожному студенту інструменти для вільної комунікації у світі без
            бар'єрів.
          </p>
          <p>
            Саме тому ми розробили власну інформаційну систему (LMS), яка
            дозволяє батькам бачити реальний прогрес дітей, а студентам — мати
            доступ до всіх матеріалів 24/7.
          </p>
          <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
              }}
            >
              <ShieldCheck color="#4f46e5" /> Безпека
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
              }}
            >
              <BookOpenCheck color="#4f46e5" /> Якість
            </div>
          </div>
        </div>

        <div className="about-image-placeholder">
          <Award size={100} strokeWidth={1} />
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "#f8fafc",
        }}
      >
        <Smile size={48} color="#4f46e5" style={{ marginBottom: "20px" }} />
        <h3>Приєднуйтесь до нашої великої родини!</h3>
      </section>
    </div>
  );
};

export default About;
