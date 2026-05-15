import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Courses from "./pages/Courses/Courses";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import About from "./pages/About/About";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [page, setPage] = useState("home");

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("home");
  };

  return (
    <div className="App">
      <Navbar user={user} setPage={setPage} logout={logout} />

      <main className="main-content">
        {page === "home" && <Home setPage={setPage} />}
        {page === "courses" && <Courses user={user} />}
        {page === "about" && <About />}
        {page === "auth" && <Auth setUser={setUser} setPage={setPage} />}
        {page === "dashboard" &&   user &&
          (user.role === "admin" ? <AdminDashboard /> :
          user.role === "teacher" ? <TeacherDashboard /> : 
            <Dashboard user={user} />
          )}
      </main>
    </div>
  );
}

export default App;
