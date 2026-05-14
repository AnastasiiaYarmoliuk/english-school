import {
  LayoutDashboard,
  TrendingUp,
  Users,
  BookOpen,
  CreditCard,
} from "lucide-react";

const AdminSidebar = ({ activeTab, setActiveTab }) => (
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
);

export default AdminSidebar;
