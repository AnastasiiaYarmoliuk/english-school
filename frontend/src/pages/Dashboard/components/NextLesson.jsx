import React from "react";
import { Video, Calendar, Clock } from "lucide-react";
import "./DashboardComponents.css";

const NextLesson = ({ lesson }) => {
  if (!lesson)
    return <div className="db-card empty">Найближчих уроків не знайдено</div>;

  return (
    <div className="db-card next-lesson-card">
      <div className="card-badge">
        <Video size={14} /> LIVE SESSION
      </div>
      <div className="lesson-main">
        <h2>{lesson.topic}</h2>
        <div className="lesson-details">
          <span>
            <Calendar size={16} />{" "}
            {new Date(lesson.date).toLocaleDateString("uk-UA")}
          </span>
          <span>
            <Clock size={16} /> {lesson.duration}
          </span>
        </div>
      </div>
      <button className="btn-join" onClick={() => window.open("#", "_blank")}>
        Приєднатися до заняття
      </button>
    </div>
  );
};

export default NextLesson;
