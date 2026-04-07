import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      {/* Isso garante que qualquer rota errada mande para a Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
