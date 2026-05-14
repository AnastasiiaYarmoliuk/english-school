import React, { useState, useEffect } from "react";
import { CreditCard, CheckCircle } from "lucide-react";
import api from "../../../api/axios";
import "./DashboardComponents.css";

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get(`/payments/user/${userId}`).then((res) => setPayments(res.data));
  }, [userId]);

  return (
    <div className="db-card payment-card">
      <h3 className="sidebar-title">
        <CreditCard size={18} color="#4f46e5" /> Оплати та рахунки
      </h3>
      <div className="payment-list">
        {payments.length > 0 ? (
          payments.map((p) => (
            <div key={p._id} className="payment-item">
              <div className="payment-info">
                <b>{p.courseId?.title || "Поповнення балансу"}</b>
                <span>{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <div className="payment-amount">
                <span className="amount">+{p.amount} ₴</span>
                <CheckCircle size={14} color="#10b981" />
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">Історія транзакцій порожня</p>
        )}
      </div>
      <button
        className="btn-pay-now"
        onClick={() => alert("Перехід на платіжну систему...")}
      >
        Поповнити баланс дитини
      </button>
    </div>
  );
};

export default PaymentHistory;
