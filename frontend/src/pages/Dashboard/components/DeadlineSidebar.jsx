import React, { useState } from "react";
import { Upload, CheckCircle, Clock, Award } from "lucide-react";
import api from "../../../api/axios";
import "./DashboardComponents.css";

const DeadlineSidebar = ({ assignments, onRefresh }) => {
  const [submittingId, setSubmittingId] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (id) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/users/assignments/${id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Відповідь надіслана!");
      setSubmittingId(null);
      setFile(null);
      onRefresh(); // Оновлюємо дані на дашборді
    } catch (err) {
      console.error("Деталі помилки:", err);
      alert("Помилка завантаження");
    }
  };

  return (
    <div className="db-card deadline-card">
      <h3 className="sidebar-title">Мої завдання</h3>
      {assignments.map((item) => (
        <div key={item._id} className="deadline-item">
          <div>
            <b>{item.title}</b>
            {item.status === "pending" && (
              <button
                className="btn-submit-task"
                onClick={() => setSubmittingId(item._id)}
              >
                <Upload size={14} /> Здати роботу
              </button>
            )}

            {item.status === "submitted" && (
              <span className="status-waiting">
                <Clock size={14} /> На перевірці
              </span>
            )}

            {item.status === "graded" && (
              <span className="status-graded">
                <Award size={14} /> Оцінено: <b>{item.grade}/100</b>
              </span>
            )}
          </div>

          {submittingId === item._id && (
            <div className="upload-zone">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={() => handleSubmit(item._id)}>Відправити</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeadlineSidebar;