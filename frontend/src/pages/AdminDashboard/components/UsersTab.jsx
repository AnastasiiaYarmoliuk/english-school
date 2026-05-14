import React, { useState } from "react";
import api from "../../../api/axios"
import { Search, Edit3, Trash2 } from "lucide-react";
import UserEditModal from "./UserEditModal";

const UsersTab = ({ users, refresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Логіка видалення
  const handleDeleteUser = async (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цього користувача?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        refresh();
      } catch (err) {
        alert("Помилка при видаленні");
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h1>Керування користувачами</h1>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Пошук за email або ім'ям..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <b>{user.name}</b>
                  <br />
                  <small>{user.email}</small>
                </td>
                <td>
                  <span className={`badge ${user.role}`}>{user.role}</span>
                </td>
                <td>{user.level || "—"}</td>
                <td>
                  <button
                    className="icon-btn"
                    onClick={() => setEditingUser(user)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={() => {
            setEditingUser(null);
            refresh();
          }}
        />
      )}
    </div>
  );
};;

export default UsersTab;
