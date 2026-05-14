const OverviewTab = ({ stats }) => {
  return (
    <div className="tab-content">
      <h1>Загальна аналітика</h1>
      <div className="admin-stats-grid">
        <div className="white-card stat-box">
          <p>Учні</p>
          <b>{stats.totalStudents}</b>
        </div>
        <div className="white-card stat-box">
          <p>Викладачі</p>
          <b>{stats.totalTeachers}</b>
        </div>
        <div className="white-card stat-box revenue">
          <p>Загальний дохід</p>
          <b>{stats.totalRevenue} ₴</b>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
