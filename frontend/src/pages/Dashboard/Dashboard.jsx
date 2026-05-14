import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import NextLesson from "./components/NextLesson";
import StatCard from "./components/StatCard";
import DeadlineSidebar from "./components/DeadlineSidebar";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/${user._id}/dashboard`)
      .then((res) => {
        setDbData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (loading)
    return <div className="loader-container">Завантаження системи...</div>;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>👋 Привіт, {user.name}</h1>
          <p>Ось твій прогрес та плани на сьогодні</p>
        </div>
        <div className={`status-tag ${user.role}`}>
          {user.role === "parent" ? "🛡️ Батьківський контроль" : "🎓 Студент"}
        </div>
      </header>

      <div className="dashboard-layout">
        <section className="main-stats-area">
          <NextLesson lesson={dbData.nextLesson} />

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

        <aside className="sidebar-area">
          <DeadlineSidebar assignments={dbData.assignments} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
