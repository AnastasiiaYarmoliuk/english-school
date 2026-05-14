import { useState } from "react";
import api from "../../../api/axios";
import { X, Check } from "lucide-react";

const UserEditModal = ({ user, onClose, onSave }) => {
  const [editingUser, setEditingUser] = useState({ ...user });

  // Логіка збереження змін
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editingUser._id}`, editingUser);
      onSave();
      onClose(); // Оновити список після редагування
      alert("Дані користувача оновлено");
    } catch (err) {
      alert("Помилка при оновленні");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="white-card edit-modal">
        <div className="modal-header">
          <h3>Редагувати користувача</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleUpdateUser}>
          <div className="form-group">
            <label>Ім'я</label>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Роль</label>
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
              >
                <option value="student">Студент</option>
                <option value="parent">Батько</option>
                <option value="teacher">Вчитель</option>
                <option value="admin">Адмін</option>
              </select>
            </div>

            {editingUser.role === "student" && (
              <div className="form-group">
                <label>Рівень</label>
                <select
                  value={editingUser.level}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      level: e.target.value,
                    })
                  }
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Баланс занять</label>
            <input
              type="number"
              value={editingUser.balance}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  balance: e.target.value,
                })
              }
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Скасувати
            </button>
            <button type="submit" className="btn-primary">
              <Check size={18} /> Зберегти зміни
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
