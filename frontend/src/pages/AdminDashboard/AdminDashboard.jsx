import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  Trash2,
  Edit3,
  Plus,
  Search,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({
    stats: null,
    users: [],
    courses: [],
    payments: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [s, u, c, p] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/courses"),
        api.get("/admin/payments"),
      ]);
      setData({
        stats: s.data,
        users: u.data,
        courses: c.data,
        payments: p.data,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loader">Завантаження...</div>;

  return (
    <div className="admin-layout">
      {/* Світлий Сайдбар */}
      <aside className="admin-sidebar">
        <div className="sidebar-title">
          <div
            style={{
              background: "#4f46e5",
              padding: "8px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <LayoutDashboard size={20} />
          </div>
          <span>Адмін-панель</span>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp size={18} /> Огляд
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} /> Користувачі
          </button>
          <button
            className={`nav-item ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            <BookOpen size={18} /> Курси
          </button>
          <button
            className={`nav-item ${activeTab === "finance" ? "active" : ""}`}
            onClick={() => setActiveTab("finance")}
          >
            <CreditCard size={18} /> Фінанси
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        {/* РОЗДІЛ: ОГЛЯД */}
        {activeTab === "overview" && (
          <div className="tab-content">
            <h1>Загальна аналітика</h1>
            <div className="admin-stats-grid">
              <div className="white-card stat-box">
                <p>Учні</p>
                <b>{data.stats.totalStudents}</b>
              </div>
              <div className="white-card stat-box">
                <p>Викладачі</p>
                <b>{data.stats.totalTeachers}</b>
              </div>
              <div className="white-card stat-box revenue">
                <p>Загальний дохід</p>
                <b>{data.stats.totalRevenue} ₴</b>
              </div>
            </div>
          </div>
        )}

        {/* РОЗДІЛ: КОРИСТУВАЧІ */}
        {activeTab === "users" && (
          <div className="tab-content">
            <div className="section-header">
              <h1>Керування користувачами</h1>
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Пошук за email..." />
              </div>
            </div>
            <div className="white-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ім'я</th>
                    <th>Роль</th>
                    <th>Рівень</th>
                    <th>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <b>{user.name}</b>
                        <br />
                        <small>{user.email}</small>
                      </td>
                      <td>
                        <span className={`badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.level || "—"}</td>
                      <td>
                        <button className="icon-btn">
                          <Edit3 size={16} />
                        </button>
                        <button className="icon-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* РОЗДІЛ: КУРСИ */}
        {activeTab === "courses" && (
          <div className="tab-content">
            <div className="section-header">
              <h1>Структура навчання</h1>
              <button className="btn-primary">
                <Plus size={18} /> Додати рівень
              </button>
            </div>
            <div className="admin-courses-grid">
              {data.courses.map((course) => (
                <div key={course._id} className="white-card course-item">
                  <h3>{course.title}</h3>
                  <p>
                    Ціна: <b>{course.price} ₴</b>
                  </p>
                  <div className="course-footer">
                    <span className="badge">{course.level}</span>
                    <button className="btn-text">Налаштувати модулі</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* РОЗДІЛ: ФІНАНСИ */}
        {activeTab === "finance" && (
          <div className="tab-content">
            <h1>Звітність та транзакції</h1>
            <div className="white-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Користувач</th>
                    <th>Курс</th>
                    <th>Сума</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>
                      <td>{payment.userId?.name}</td>
                      <td>{payment.courseId?.title}</td>
                      <td>
                        <b>{payment.amount} ₴</b>
                      </td>
                      <td>
                        <span className="status-success">Виконано</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
