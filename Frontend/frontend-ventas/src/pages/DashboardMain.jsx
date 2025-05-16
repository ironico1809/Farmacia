// Página principal del dashboard
import React from 'react';
import '../componentes/DashboardMain.css';

const stats = [
  {
    id: 1,
    value: 150,
    label: 'Venta Del Dia Por Vendedor',
    color: 'bg-info',
    icon: 'fa-shopping-bag',
    info: 'Información',
  },
  {
    id: 2,
    value: '53%',
    label: 'Venta Total Del Dia',
    color: 'bg-success',
    icon: 'fa-chart-bar',
    info: 'Información',
  },
  {
    id: 3,
    value: 44,
    label: 'Ganancia Mensual',
    color: 'bg-warning',
    icon: 'fa-user-plus',
    info: 'Información',
  },
  {
    id: 4,
    value: 65,
    label: 'Productos Perdidos',
    color: 'bg-danger',
    icon: 'fa-chart-pie',
    info: 'Información',
  },
];

const DashboardMain = () => {
  return (
    <main className="dashboard-main">
      <div className="dashboard-header-row">
        <h2 className="dashboard-title">BIENVENIDA AL SISTEMA</h2>
      </div>
      <div className="stats-row">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card ${stat.color}`}> 
            <div className="stat-card-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <i className={`fa ${stat.icon} stat-icon`}></i>
                <div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            </div>
            <div className="stat-info-section">
              <span className="stat-info">{stat.info}</span>
              <i className="fa fa-arrow-circle-right" style={{ fontSize: '1.1rem', opacity: 0.7 }}></i>
            </div>
          </div>
        ))}
      </div>
      {/* Aquí puedes agregar más componentes como gráficos, tablas, etc. */}
    </main>
  );
};

export default DashboardMain;
