import React, { useState } from 'react';
import '../App.css';

// Navbar principal para el dashboard moderno
function Navbar({ onToggleSidebar }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Función para alternar pantalla completa
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <nav className="navbar-main" style={{ background: '#fff', borderRadius: '18px', margin: '1.2rem 1.5rem 1.5rem 1.5rem', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', padding: '0.5rem 2rem', minHeight: '56px' }}>
      <button className="menu-toggle-btn" onClick={onToggleSidebar} style={{ background: 'none', border: 'none', marginRight: '1.2rem', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }}>
        <i className="fa fa-bars" style={{ fontSize: '1.5rem', color: '#444' }}></i>
      </button>
      <span className="navbar-title" style={{ fontWeight: 600, fontSize: '1.15rem', color: '#444', letterSpacing: '1px', cursor: 'pointer' }} onClick={() => window.location.pathname = '/'}>INICIO</span>
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginLeft: 'auto' }}>
        {/* Icono de búsqueda */}
        <button className="icon-btn" title="Buscar" style={{ background: 'none', border: 'none', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }}>
          <i className="fa fa-search" style={{ fontSize: '1.18rem', color: '#888' }}></i>
        </button>
        {/* Icono de mensajes */}
        <button className="icon-btn" title="Mensajes" style={{ background: 'none', border: 'none', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }}>
          <i className="fa fa-comments" style={{ fontSize: '1.18rem', color: '#888' }}></i>
        </button>
        {/* Icono de notificaciones (solo icono, sin badge) */}
        <button className="icon-btn" title="Notificaciones" style={{ background: 'none', border: 'none', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }}>
          <i className="fa fa-bell" style={{ fontSize: '1.18rem', color: '#ffc107' }}></i>
        </button>
        {/* Icono de pantalla completa */}
        <button className="icon-btn" title="Pantalla completa" style={{ background: 'none', border: 'none', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }} onClick={handleFullscreen}>
          <i className={`fa ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} style={{ fontSize: '1.18rem', color: '#888' }}></i>
        </button>
        {/* Botón de cerrar sesión */}
        <button className="icon-btn" title="Cerrar sesión" style={{ background: 'none', border: 'none', borderRadius: '50%', padding: '0.5rem', transition: 'background 0.2s' }} onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}>
          <i className="fa fa-sign-out-alt" style={{ fontSize: '1.18rem', color: '#e11d48' }}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
