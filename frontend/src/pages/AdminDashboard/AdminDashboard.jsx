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
