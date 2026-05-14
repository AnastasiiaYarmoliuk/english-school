import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import SearchBar from "./components/SearchBar";
import CourseCard from "./components/CourseCard";
import "./Courses.css";

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // ЛОГІКА ПОШУКУ
  useEffect(() => {
    const results = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.level.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  if (loading) return <div className="loader">Завантаження курсів...</div>;

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>
          Оберіть свою програму <span>навчання</span>
        </h1>
        <p>Від початківця до вільного володіння — у нас є курс для кожного.</p>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} user={user} />
          ))
        ) : (
          <div className="no-results">
            <h3>Нічого не знайдено за вашим запитом 😕</h3>
            <button onClick={() => setSearchTerm("")} className="btn-text">
              Скинути пошук
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
