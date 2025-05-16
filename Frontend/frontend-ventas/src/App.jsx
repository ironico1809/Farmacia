import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import './App.css';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/*" element={<MainLayout />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default App;