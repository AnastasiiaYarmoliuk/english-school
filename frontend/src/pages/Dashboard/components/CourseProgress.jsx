import React from "react";
import "./DashboardComponents.css";

const CourseProgress = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100) || 0;

  return (
    <div className="db-card progress-card">
      <div className="progress-header">
        <h3>Прогрес у навчанні</h3>
        <span className="percentage-text">{percentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="progress-stats">
        Пройдено: <b>{completed}</b> з <b>{total}</b> модулів
      </p>
    </div>
  );
};

export default CourseProgress;
