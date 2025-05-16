// Layout principal de la app
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../componentes/Sidebar';
import Navbar from '../componentes/Navbar';
import DashboardMain from './DashboardMain';
import RegistrarVenta from './RegistrarVenta';
import '../App.css';

const MainLayout = () => {
  // Sidebar cerrada por defecto al iniciar sesión
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="main-layout">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="main-content-area">
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <Routes>
          <Route path="/ventas" element={<RegistrarVenta />} />
          <Route path="*" element={<DashboardMain />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
