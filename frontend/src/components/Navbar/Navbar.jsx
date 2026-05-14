import React, { useState } from "react";
import {
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  LogOut,
  Info,
  BookOpen,
  Home,
} from "lucide-react";
import "./Navbar.css";

const Navbar = ({ user, setPage, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setPage(page);
    setIsMobileMenuOpen(false); // Закриваємо меню після кліку
  };

  return (
    <nav className="navbar">
      {/* Логотип */}
      <div className="nav-logo" onClick={() => handleNavClick("home")}>
        <span>EngSchool</span>
      </div>

      {/* Бургер-іконка для мобільних */}
      <button
        className="mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Меню навігації */}
      <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <button className="nav-link" onClick={() => handleNavClick("home")}>
          <Home size={18} style={{ marginRight: "5px" }} /> Головна
        </button>
        <button className="nav-link" onClick={() => handleNavClick("courses")}>
          <BookOpen size={18} style={{ marginRight: "5px" }} /> Курси
        </button>
        <button className="nav-link" onClick={() => handleNavClick("about")}>
          <Info size={18} style={{ marginRight: "5px" }} /> Про нас
        </button>

        <div className="auth-section">
          {user ? (
            <>
              <button
                className="btn-auth"
                onClick={() => handleNavClick("dashboard")}
              >
                <LayoutDashboard size={18} /> Кабінет
              </button>
              <button
                className="nav-link"
                style={{ color: "#ef4444" }}
                onClick={logout}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button className="btn-auth" onClick={() => handleNavClick("auth")}>
              <LogIn size={18} /> Увійти
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
