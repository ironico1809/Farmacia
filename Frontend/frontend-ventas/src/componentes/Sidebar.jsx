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
      <div
        className={`sidebar-overlay${isOpen ? ' sidebar-overlay-open' : ''}`}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,41,59,0.10)',
          zIndex: 1001,
          transition: 'opacity 0.2s',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          backdropFilter: 'blur(2px)',
        }}
      ></div>
      <aside
        className={`sidebar${isOpen ? ' sidebar-open' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 70%, #e0e7ff 100%)',
          boxShadow: '2px 0 16px 0 rgba(30,41,59,0.10)',
          borderTopRightRadius: '1.5rem',
          borderBottomRightRadius: '1.5rem',
          minWidth: 270,
          maxWidth: 320,
          transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <div
          className="brand-section"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '2rem 1.5rem 1rem 1.5rem',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Farmacia Britmann"
            className="brand-logo"
            style={{
              width: 44,
              height: 44,
              borderRadius: '1rem',
              boxShadow: '0 2px 8px #c7d2fe',
            }}
          />
          <span
            className="brand-title"
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#2563eb',
              letterSpacing: '0.02em',
            }}
          >
            Farmacia Britmann
          </span>
        </div>
        <div
          className="user-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '1.2rem 1.5rem',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Usuario"
            className="user-avatar"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '2px solid #2563eb',
            }}
          />
          <span
            className="user-name"
            style={{
              fontWeight: 600,
              fontSize: '1.08rem',
              color: '#334155',
            }}
          >
            Usuario
          </span>
        </div>
        <nav className="sidebar-nav" style={{ paddingTop: '1.2rem' }}>
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
            }}
          >
            <li className="sidebar-group">
              <div
                className={`sidebar-link sidebar-inventario${
                  location.pathname === '/inventario' ? ' sidebar-link-active' : ''
                }`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  cursor: 'pointer',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#2563eb',
                  background:
                    location.pathname === '/inventario'
                      ? 'rgba(37,99,235,0.08)'
                      : 'transparent',
                  boxShadow:
                    location.pathname === '/inventario' ? '0 2px 8px #c7d2fe' : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onClick={() => {
                  navigate('/inventario');
                  onClose && onClose();
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.10)')}
                onMouseLeave={e => (e.currentTarget.style.background = location.pathname === '/inventario' ? 'rgba(37,99,235,0.08)' : 'transparent')}
              >
                <i className="fa fa-warehouse" style={{ color: '#2563eb', fontSize: '1.25rem' }}></i>
                Inventario
              </div>
            </li>
            {/* Ventas/Facturación */}
            <li className="sidebar-group">
              <div
                className={`sidebar-link${
                  location.pathname === '/ventas' ? ' sidebar-link-active' : ''
                }`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  cursor: 'pointer',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color:
                    location.pathname === '/ventas' ? '#22c55e' : '#334155',
                  background:
                    location.pathname === '/ventas'
                      ? 'rgba(34,197,94,0.10)'
                      : 'transparent',
                  boxShadow:
                    location.pathname === '/ventas' ? '0 2px 8px #bbf7d0' : 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => {
                  navigate('/ventas');
                  onClose && onClose();
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'rgba(34,197,94,0.13)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    location.pathname === '/ventas'
                      ? 'rgba(34,197,94,0.10)'
                      : 'transparent')
                }
              >
                <i
                  className="fa fa-file-invoice-dollar"
                  style={{ color: '#22c55e', fontSize: '1.25rem' }}
                ></i>
                Ventas/Facturación
              </div>
            </li>
            {/* Compras */}
            <li className="sidebar-group">
              <div
                className={`sidebar-link compras${location.pathname === '/compras' ? ' sidebar-link-active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: location.pathname === '/compras' ? '#f59e42' : '#f59e42',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background: location.pathname === '/compras' ? 'rgba(245,158,66,0.10)' : 'transparent',
                  boxShadow: location.pathname === '/compras' ? '0 2px 8px #fde68a' : 'none',
                }}
                onClick={() => {
                  navigate('/compras');
                  onClose && onClose();
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'rgba(245,158,66,0.10)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = location.pathname === '/compras' ? 'rgba(245,158,66,0.10)' : 'transparent')
                }
              >
                <i
                  className="fa fa-shopping-basket"
                  style={{ color: '#f59e42', fontSize: '1.25rem' }}
                ></i>
                Compras
              </div>
            </li>
            {/* Clientes */}
            <li className="sidebar-group">
              <div
                className={`sidebar-link${
                  location.pathname === '/clientes/gestionar' ? ' sidebar-link-active' : ''
                }`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#0ea5e9',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background: location.pathname === '/clientes/gestionar' ? 'rgba(14,165,233,0.10)' : 'transparent',
                  boxShadow: location.pathname === '/clientes/gestionar' ? '0 2px 8px #bae6fd' : 'none',
                }}
                onClick={() => {
                  navigate('/clientes/gestionar');
                  onClose && onClose();
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.13)')}
                onMouseLeave={e => (e.currentTarget.style.background = location.pathname === '/clientes/gestionar' ? 'rgba(14,165,233,0.10)' : 'transparent')}
              >
                <i
                  className="fa fa-user-friends"
                  style={{ color: '#0ea5e9', fontSize: '1.25rem' }}
                ></i>
                Clientes
              </div>
            </li>
            {/* Administración */}
            <li className="sidebar-group">
              <div
                className="sidebar-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#a21caf',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onClick={() => setActiveMenu(activeMenu === 'admin' ? '' : 'admin')}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'rgba(162,28,175,0.10)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                <i
                  className="fa fa-cogs"
                  style={{ color: '#a21caf', fontSize: '1.25rem' }}
                ></i>
                Administración
                <span className="arrow" style={{ marginLeft: 'auto' }}>
                  <i className={`fa fa-chevron-${activeMenu === 'admin' ? 'down' : 'right'}`}></i>
                </span>
              </div>
              {activeMenu === 'admin' && (
                <ul
                  className="submenu submenu-admin"
                  style={{
                    background: '#f3e8ff',
                    borderRadius: '0.7rem',
                    margin: '0.2rem 0 0.5rem 0.7rem',
                    boxShadow: '0 2px 8px #e9d5ff',
                    padding: '0.4rem 0',
                    animation: 'fadeIn 0.25s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.1rem',
                  }}
                >
                  <li>
                    <div
                      className={`sidebar-link${
                        location.pathname === '/administracion/gestionar-usuarios' ? ' sidebar-link-active' : ''
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0.7rem 1.5rem',
                        cursor: 'pointer',
                        borderRadius: '0.7rem',
                        fontWeight: 500,
                        fontSize: '1.04rem',
                        color: location.pathname === '/administracion/gestionar-usuarios' ? '#a21caf' : '#6d28d9',
                        background: location.pathname === '/administracion/gestionar-usuarios' ? 'rgba(162,28,175,0.10)' : 'transparent',
                        boxShadow: location.pathname === '/administracion/gestionar-usuarios' ? '0 2px 8px #e9d5ff' : 'none',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onClick={() => {
                        navigate('/administracion/gestionar-usuarios');
                        onClose && onClose();
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(162,28,175,0.13)')}
                      onMouseLeave={e => (e.currentTarget.style.background = location.pathname === '/administracion/gestionar-usuarios' ? 'rgba(162,28,175,0.10)' : 'transparent')}
                    >
                      <i className="fa fa-users" style={{ color: '#a21caf', fontSize: '1.1rem' }}></i>
                      Gestionar Usuarios
                    </div>
                  </li>
                </ul>
              )}
            </li>
            {/* Reportes y Bitácora */}
            <li className="sidebar-group">
              <div
                className="sidebar-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#e11d48',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'rgba(225,29,72,0.10)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                <i
                  className="fa fa-chart-line"
                  style={{ color: '#e11d48', fontSize: '1.25rem' }}
                ></i>
                Reportes y Bitácora
              </div>
            </li>
            {/* Recetas Médicas */}
            <li className="sidebar-group">
              <div
                className="sidebar-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#0d9488',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onClick={() => {
                  navigate('/recetas/validar');
                  onClose && onClose();
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,148,136,0.10)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <i
                  className="fa fa-file-medical"
                  style={{ color: '#0d9488', fontSize: '1.25rem' }}
                ></i>
                Recetas Médicas
              </div>
            </li>
            {/* Categorías y Productos */}
            <li className="sidebar-group">
              <div
                className="sidebar-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 1.7rem',
                  borderRadius: '0.8rem',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  color: '#fbbf24',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background:
                    activeMenu === 'categorias' ? 'rgba(251,191,36,0.08)' : 'transparent',
                  boxShadow: activeMenu === 'categorias' ? '0 2px 8px #fde68a' : 'none',
                }}
                onClick={() => setActiveMenu(activeMenu === 'categorias' ? '' : 'categorias')}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(251,191,36,0.10)')}
                onMouseLeave={e => (e.currentTarget.style.background = activeMenu === 'categorias' ? 'rgba(251,191,36,0.08)' : 'transparent')}
              >
                <i
                  className="fa fa-boxes"
                  style={{ color: '#fbbf24', fontSize: '1.25rem' }}
                ></i>
                Categorías y Productos
                <span className="arrow" style={{ marginLeft: 'auto' }}>
                  <i className={`fa fa-chevron-${activeMenu === 'categorias' ? 'down' : 'right'}`}></i>
                </span>
              </div>
              {activeMenu === 'categorias' && (
                <ul
                  className="submenu submenu-categorias"
                  style={{
                    background: '#fef9c3',
                    borderRadius: '0.7rem',
                    margin: '0.2rem 0 0.5rem 0.7rem',
                    boxShadow: '0 2px 8px #fde68a',
                    padding: '0.4rem 0',
                    animation: 'fadeIn 0.25s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.1rem',
                  }}
                >
                  <li>
                    <div
                      className={`sidebar-link${
                        location.pathname === '/inventario/gestionar-productos' ? ' sidebar-link-active' : ''
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0.7rem 1.5rem',
                        cursor: 'pointer',
                        borderRadius: '0.7rem',
                        fontWeight: 500,
                        fontSize: '1.04rem',
                        color: location.pathname === '/inventario/gestionar-productos' ? '#fbbf24' : '#b45309',
                        background: location.pathname === '/inventario/gestionar-productos' ? 'rgba(251,191,36,0.10)' : 'transparent',
                        boxShadow: location.pathname === '/inventario/gestionar-productos' ? '0 2px 8px #fde68a' : 'none',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onClick={() => {
                        navigate('/inventario/gestionar-productos');
                        onClose && onClose();
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(251,191,36,0.13)')}
                      onMouseLeave={e => (e.currentTarget.style.background = location.pathname === '/inventario/gestionar-productos' ? 'rgba(251,191,36,0.10)' : 'transparent')}
                    >
                      <i className="fa fa-tasks" style={{ color: '#fbbf24', fontSize: '1.1rem' }}></i>
                      Gestionar Productos
                    </div>
                  </li>
                  {/* Aquí puedes agregar más subopciones de categorías/productos si lo deseas */}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
