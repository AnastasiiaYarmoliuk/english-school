import { useState } from "react";
import { X, Plus, Trash2, Check } from "lucide-react";
import api from "../../../api/axios";

const CourseEditModal = ({ course, onSave, onClose }) => {
  const [currentCourse, setCurrentCourse] = useState({ ...course });

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

  // Видалити урок
  const removeLessonField = (index) => {
    const updatedLessons = currentCourse.lessons.filter((_, i) => i !== index);
    setCurrentCourse({ ...currentCourse, lessons: updatedLessons });
  };

  // Оновити конкретне поле уроку
  const handleLessonChange = (index, field, value) => {
    const newLessons = [...formData.lessons];
    newLessons[index][field] = value;
    setFormData({ ...formData, lessons: newLessons });
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
      onSave();
      onClose();
      alert("Курс збережено!");
    } catch (err) {
      alert("Помилка збереження курсу");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="white-card edit-modal course-modal">
        <div className="modal-header">
          <h3>
            {currentCourse._id ? "Редагувати курс" : "Створити новий курс"}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSaveCourse} className="admin-form">
          <div className="form-group">
            <label>Назва курсу</label>
            <input
              type="text"
              value={currentCourse.title}
              onChange={(e) =>
                setCurrentCourse({
                  ...currentCourse,
                  title: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Рівень</label>
              <select
                value={currentCourse.level}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    level: e.target.value,
                  })
                }
              >
                {["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ціна (₴)</label>
              <input
                type="number"
                value={currentCourse.price}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* СЕКЦІЯ УРОКІВ */}
          <div className="lessons-management">
            <div className="lessons-header">
              <h4>Уроки курсу ({currentCourse.lessons.length})</h4>
              <button
                type="button"
                className="btn-add-small"
                onClick={addLessonField}
              >
                <Plus size={14} /> Додати урок
              </button>
            </div>

            <div className="lessons-list">
              {currentCourse.lessons.map((lesson, index) => (
                <div key={index} className="lesson-edit-row">
                  <input
                    placeholder="Тема уроку"
                    value={lesson.topic}
                    onChange={(e) => {
                      handleLessonChange(index, "topic", e.target.value);
                    }}
                  />
                  <select
                    value={lesson.type}
                    onChange={(e) => {
                      handleLessonChange(index, "type", e.target.value);
                    }}
                  >
                    <option value="Video">Video</option>
                    <option value="Live Session">Live</option>
                    <option value="Quiz">Quiz</option>
                  </select>
                  <input
                    placeholder="Час"
                    value={lesson.duration}
                    onChange={(e) =>
                      handleLessonChange(index, "duration", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn-del-lesson"
                    onClick={() => removeLessonField(index)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "25%" }}
            >
              <Check size={18} /> Зберегти курс
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal;
