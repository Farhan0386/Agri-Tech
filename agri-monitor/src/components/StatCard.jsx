import React from 'react';

const StatCard = ({ icon: Icon, label, value, tone = 'success' }) => {
  const toneClass = tone === 'soil' ? 'stat-card-soil' : 'stat-card-success';

  return (
    <div className={`stat-card ${toneClass}`}>
      <div className="stat-icon-wrap">
        <Icon size={16} />
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
