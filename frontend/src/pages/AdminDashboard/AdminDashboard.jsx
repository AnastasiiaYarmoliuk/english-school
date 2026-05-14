import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import AdminSidebar from "./components/AdminSidebar";
import OverviewTab from "./components/OverviewTab";
import UsersTab from "./components/UsersTab";
import CoursesTab from "./components/CoursesTab";
import FinanceTab from "./components/FinanceTab";
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

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    title: "",
    level: "A1",
    price: 0,
    description: "",
    lessons: [],
  });

  // Нові стани для пошуку та редагування
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [financeSearch, setFinanceSearch] = useState("");

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

  // Логіка пошуку
  const filteredUsers = data.users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Логіка збереження змін
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchAdminData(); // Оновити список після редагування
      alert("Дані користувача оновлено");
    } catch (err) {
      alert("Помилка при оновленні");
    }
  };

  // Логіка видалення
  const handleDeleteUser = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цього користувача?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchAdminData();
      } catch (err) {
        alert("Помилка при видаленні");
      }
    }
  };

  // Відкрити форму для нового курсу
  const handleAddNewCourse = () => {
    setCurrentCourse({
      title: "",
      level: "A1",
      price: 0,
      description: "",
      lessons: [],
    });
    setIsCourseModalOpen(true);
  };

  // Відкрити форму для редагування існуючого
  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsCourseModalOpen(true);
  };

  // Додати порожній рядок уроку в масив
  const addLessonField = () => {
    setCurrentCourse({
      ...currentCourse,
      lessons: [
        ...currentCourse.lessons,
        { topic: "", type: "Video", duration: "" },
      ],
    });
  };

  // Збереження курсу
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      if (currentCourse._id) {
        await api.put(`/courses/${currentCourse._id}`, currentCourse);
      } else {
        await api.post("/courses", currentCourse);
      }
      setIsCourseModalOpen(false);
      fetchAdminData(); // Перезавантажити дані
      alert("Курс збережено!");
    } catch (err) {
      alert("Помилка збереження");
    }
  };

  const filteredPayments = data.payments.filter(
    (p) =>
      p.userId?.name.toLowerCase().includes(financeSearch.toLowerCase()) ||
      p.courseId?.title.toLowerCase().includes(financeSearch.toLowerCase()),
  );



  if (loading) return <div className="loader">Завантаження...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="admin-main">
        {activeTab === "overview" && (
          <OverviewTab
            stats={data.stats}
            paymentsCount={data.payments.length}
          />
        )}
        {activeTab === "users" && (
          <UsersTab users={data.users} refresh={fetchAdminData} />
        )}
        {activeTab === "courses" && (
          <CoursesTab courses={data.courses} refresh={fetchAdminData} />
        )}
        {activeTab === "finance" && (
          <FinanceTab payments={data.payments} stats={data.stats} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
