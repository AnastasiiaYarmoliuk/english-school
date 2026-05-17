import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { Users, FileCheck, Award, Download, Check, X } from "lucide-react";
import "./TeacherDashboard.css";

const TeacherDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("homework");
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null); // Для кого створюємо ДЗ
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sRes, subRes] = await Promise.all([
        api.get("/teacher/students"),
        api.get("/teacher/submissions"),
      ]);
      setStudents(sRes.data);
      setSubmissions(subRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGrade = async (id, grade) => {
    try {
      await api.patch(`/teacher/assignments/${id}/grade`, { grade });
      alert("Оцінку виставлено!");
      fetchData(); // Оновити список
    } catch (err) {
      alert("Помилка");
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {

      await api.post("/teacher/assignments", {
        studentId: selectedStudent._id,
        title: newAssignment.title,
        dueDate: newAssignment.dueDate,
      });

      alert("Завдання призначено!");
      setSelectedStudent(null); // Закрити форму
      setNewAssignment({ title: "", dueDate: "" });
    } catch (err) {
      alert("Помилка створення");
    }
  };

  if (loading) return <div className="loader">Завантаження...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-title">👨‍🏫 Кабінет Вчителя</div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "homework" ? "active" : ""}`}
            onClick={() => setActiveTab("homework")}
          >
            <FileCheck size={18} /> Перевірка ДЗ
          </button>
          <button
            className={`nav-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <Users size={18} /> Мої учні
          </button>
        </nav>
      </aside>
      <main className="admin-main">
        {/* ТАБ: ПЕРЕВІРКА ДЗ */}
        {activeTab === "homework" && (
          <div className="tab-content">
            <h1>Черга на перевірку</h1>
            <div className="submissions-grid">
              {submissions.length > 0 ? (
                submissions.map((sub) => (
                  <div key={sub._id} className="white-card submission-card">
                    <div className="sub-header">
                      <b>{sub.studentId?.name}</b>
                      <span className="badge">{sub.courseId?.title}</span>
                    </div>
                    <p>
                      Завдання: <b>{sub.title}</b>
                    </p>

                    {sub.fileName && (
                      <div className="file-link">
                        <Download size={16} />
                        <a
                          href={`http://localhost:5000/uploads/${sub.fileName}`}
                          target="_blank"
                        >
                          Переглянути файл
                        </a>
                      </div>
                    )}

                    <div className="grading-area">
                      <input
                        type="number"
                        placeholder="Бал (0-100)"
                        id={`grade-${sub._id}`}
                      />
                      <button
                        onClick={() => {
                          const g = document.getElementById(
                            `grade-${sub._id}`,
                          ).value;
                          handleGrade(sub._id, g);
                        }}
                      >
                        <Check size={16} /> Оцінити
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Всі завдання перевірені! 🎉</p>
              )}
            </div>
          </div>
        )}

        {/* ТАБ: МОЇ УЧНІ */}
        {activeTab === "students" && (
          <div className="tab-content">
            <h1>Реєстр учнів</h1>
            <div className="white-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ім'я</th>
                    <th>Email</th>
                    <th>Рівень</th>
                    <th>Баланс</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <b>{s.name}</b>
                      </td>
                      <td>{s.email}</td>
                      <td>
                        <span className="badge">{s.level}</span>
                      </td>
                      <td>{s.balance} занять</td>
                      <td>
                        <button
                          className="btn-assign"
                          onClick={() => setSelectedStudent(s)}
                        >
                          📝 Дати ДЗ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="white-card edit-modal">
            <div className="modal-header">
              <h3>Призначити завдання для: {selectedStudent.name}</h3>
              <button onClick={() => setSelectedStudent(null)}>
                <X />
              </button>
            </div>
            <form onSubmit={handleAssignTask}>
              <div className="form-group">
                <label>Назва завдання</label>
                <input
                  type="text"
                  placeholder="Наприклад: Grammar Unit 5: Past Tenses"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Дедлайн</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      dueDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="send-btn"
                style={{ width: "100%" }}
              >
                <Check size={18} /> Відправити студенту
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
