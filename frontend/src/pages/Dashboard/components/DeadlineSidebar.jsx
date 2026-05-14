import React from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import "./DashboardComponents.css";

const DeadlineSidebar = ({ assignments }) => {
  return (
    <div className="db-card deadline-card">
      <h3 className="sidebar-title">
        <Clock size={18} color="#e11d48" /> Дедлайни
      </h3>
      <div className="deadline-list">
        {assignments.length > 0 ? (
          assignments.map((item) => (
            <div key={item._id} className={`deadline-item ${item.status}`}>
              <div className="deadline-info">
                <span className="deadline-title">{item.title}</span>
                <span className="deadline-date">
                  До: {new Date(item.dueDate).toLocaleDateString("uk-UA")}
                </span>
              </div>
              {item.status === "completed" ? (
                <CheckCircle size={18} color="#10b981" />
              ) : (
                <AlertCircle size={18} color="#f59e0b" />
              )}
            </div>
          ))
        ) : (
          <p className="empty-text">Немає активних завдань</p>
        )}
      </div>
    </div>
  );
};

export default DeadlineSidebar;
