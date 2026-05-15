import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import NextLesson from "./components/NextLesson";
import StatCard from "./components/StatCard";
import DeadlineSidebar from "./components/DeadlineSidebar";
import CourseProgress from "./components/CourseProgress";
import PaymentHistory from "./components/PaymentHistory";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get(`/users/${user._id}/dashboard`);
      setDbData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchData();
    }
  }, [user]);
  if (loading)
    return <div className="loader-container">Завантаження системи...</div>;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>👋 Привіт, {user.name}</h1>
          <p>
            {user.role === "parent"
              ? "Контроль навчання та оплати"
              : "Твій прогрес та плани на сьогодні"}
          </p>
        </div>
        <div className={`status-tag ${user.role}`}>
          {user.role === "parent" ? "🛡️ Батьківський контроль" : "🎓 Студент"}
        </div>
      </header>

      <div className="dashboard-layout">
        <section className="main-stats-area">
          {user.role === "student" && <NextLesson lesson={dbData.nextLesson} />}

          <div style={{ marginTop: user.role === "parent" ? "0" : "25px" }}>
            <CourseProgress
              completed={dbData.profile.completedModules || 0}
              total={dbData.profile.totalModules || 10}
              role={user.role}
            />
          </div>

          <div className="stats-grid">
            <StatCard
              type="level"
              value={dbData.profile.level}
              label={user.role === "parent" ? "Рівень дитини" : "Мій рівень"}
            />
            <StatCard
              type="balance"
              value={dbData.profile.balance}
              label={user.role === "parent" ? "Залишок дитини" : "Мій баланс"}
            />
          </div>
        </section>

        {user.role === "student" ? (
          <DeadlineSidebar assignments={dbData.assignments} onRefresh={fetchData}/>
        ) : (
          <PaymentHistory userId={user._id} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
