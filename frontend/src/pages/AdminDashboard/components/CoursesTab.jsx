import { useState } from "react";
import { Plus } from "lucide-react";
import CourseEditModal from "./CourseEditModal";

const CoursesTab = ({ courses, refresh }) => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

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

  return (
    <div className="tab-content">
      <div className="section-header">
        <h1>Структура навчання</h1>
        <button className="btn-primary" onClick={handleAddNewCourse}>
          <Plus size={18} /> Додати курс
        </button>
      </div>
      <div className="admin-courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="white-card course-item">
            <h3>{course.title}</h3>
            <p>
              Ціна: <b>{course.price} ₴</b>
            </p>
            <div className="course-footer">
              <span className="badge">{course.level}</span>
              <button
                className="btn-text"
                onClick={() => handleEditCourse(course)}
              >
                Редагувати
              </button>
            </div>
          </div>
        ))}
      </div>
      {isCourseModalOpen && (
        <CourseEditModal
          course={currentCourse}
          onClose={() => setIsCourseModalOpen(false)}
          onSave={() => {
            setIsCourseModalOpen(false);
            refresh();
          }}
        />
      )}
    </div>
  );
};

export default CoursesTab;
