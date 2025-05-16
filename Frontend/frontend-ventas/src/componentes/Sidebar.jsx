import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  return (
    <>
      <div className={`sidebar-overlay${isOpen ? ' sidebar-overlay-open' : ''}`} onClick={onClose} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.08)',zIndex:1001,transition:'opacity 0.2s',opacity:isOpen?1:0,pointerEvents:isOpen?'auto':'none'}}></div>
      <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
        <div className="brand-section">
          <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Farmacia Britmann" className="brand-logo" />
          <span className="brand-title">Farmacia Britmann</span>
        </div>
        <div className="user-panel">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Usuario" className="user-avatar" />
          <span className="user-name">Usuario</span>
        </div>
        <nav className="sidebar-nav">
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-warehouse" style={{ color: '#2563eb', fontSize: '1.1rem' }}></i>
                Inventario
              </div>
            </li>
            <li className="sidebar-group">
              <div
                className={`sidebar-link${location.pathname === '/ventas' ? ' sidebar-link-active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem', cursor: 'pointer' }}
                onClick={() => { navigate('/ventas'); onClose && onClose(); }}
              >
                <i className="fa fa-file-invoice-dollar" style={{ color: '#22c55e', fontSize: '1.1rem' }}></i>
                Ventas/Facturación
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-shopping-basket" style={{ color: '#f59e42', fontSize: '1.1rem' }}></i>
                Compras
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-user-friends" style={{ color: '#0ea5e9', fontSize: '1.1rem' }}></i>
                Clientes
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-cogs" style={{ color: '#a21caf', fontSize: '1.1rem' }}></i>
                Administración
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-chart-line" style={{ color: '#e11d48', fontSize: '1.1rem' }}></i>
                Reportes y Bitácora
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-file-medical" style={{ color: '#0d9488', fontSize: '1.1rem' }}></i>
                Recetas Médicas
              </div>
            </li>
            <li className="sidebar-group">
              <div className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1.2rem' }}>
                <i className="fa fa-boxes" style={{ color: '#fbbf24', fontSize: '1.1rem' }}></i>
                Categorías y Productos
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
