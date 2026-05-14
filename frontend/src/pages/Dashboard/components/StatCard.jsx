import React from "react";
import { Trophy, Wallet } from "lucide-react";
import "./DashboardComponents.css";

const StatCard = ({ type, value, label }) => {
  const isLevel = type === "level";
  return (
    <div className="stat-card-box">
      <div className={`stat-icon-wrapper ${type}`}>
        {isLevel ? <Trophy size={24} /> : <Wallet size={24} />}
      </div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
