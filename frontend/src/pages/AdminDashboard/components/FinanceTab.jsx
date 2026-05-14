import React, { useState } from "react";
import { Search } from "lucide-react";

const FinanceTab = ({ payments, stats }) => {
  const [financeSearch, setFinanceSearch] = useState("");
  const filtered = payments.filter((p) =>
    p.userId?.name.toLowerCase().includes(financeSearch.toLowerCase()),
  );

  const filteredPayments = payments.filter(
    (p) =>
      p.userId?.name.toLowerCase().includes(financeSearch.toLowerCase()) ||
      p.courseId?.title.toLowerCase().includes(financeSearch.toLowerCase()),
  );

  // Розрахунок середнього чека
  const avgTicket = stats?.totalRevenue / (payments.length || 1);

  return (
    <div className="tab-content">
      <div className="section-header">
        <h1>Фінансова звітність</h1>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Пошук за студентом або курсом..."
            value={financeSearch}
            onChange={(e) => setFinanceSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Картки швидкої аналітики */}
      <div className="admin-stats-grid" style={{ marginBottom: "30px" }}>
        <div className="white-card stat-box">
          <p>Загальний дохід</p>
          <b style={{ color: "#10b981" }}>
            {stats.totalRevenue.toLocaleString()} ₴
          </b>
        </div>
        <div className="white-card stat-box">
          <p>Транзакцій</p>
          <b>{payments.length}</b>
        </div>
        <div className="white-card stat-box">
          <p>Середній чек</p>
          <b>{Math.round(avgTicket).toLocaleString()} ₴</b>
        </div>
      </div>

      <div className="white-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Студент</th>
                <th>Курс</th>
                <th>Метод</th>
                <th>Сума</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="date-cell">
                      {new Date(p.date).toLocaleDateString("uk-UA")}
                      <span>
                        {new Date(p.date).toLocaleTimeString("uk-UA", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                  <td>
                    <b>{p.userId?.name}</b>
                    <br />
                    <small>{p.userId?.email}</small>
                  </td>
                  <td>{p.courseId?.title}</td>
                  <td>
                    <span className="gateway-tag">
                      {p.gateway || "Monobank"}
                    </span>
                  </td>
                  <td>
                    <b className="amount-text">{p.amount} ₴</b>
                  </td>
                  <td>
                    <span className={`status-pill ${p.status || "success"}`}>
                      {p.status === "success" ? "Оплачено" : "Очікує"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="empty-state">
            За вашим запитом транзакцій не знайдено
          </div>
        )}
      </div>
    </div>
  );
};;

export default FinanceTab;
