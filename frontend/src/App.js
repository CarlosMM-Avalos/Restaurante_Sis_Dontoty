import { useEffect, useState } from 'react';
import {
  obtenerPreparaciones,
  crearPreparacion,
  eliminarPreparacion,
  actualizarPreparacion,
} from './services/api';
import './App.css';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ClienteMenu from './components/ClienteMenu';
import EncargadoPedidos from './components/EncargadoPedidos';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const token = localStorage.getItem('access_token');
  return(
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome" element={token ? <Welcome /> : <Navigate to="/login" />} />

         {/* Nuevas rutas protegidas por token */}
        <Route path="/cliente/menu" element={token ? <ClienteMenu /> : <Navigate to="/login" />} />
        <Route path="/encargado/pedidos" element={token ? <EncargadoPedidos /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />





        {/* otros */}
        <Route path="*" element={<Navigate to={token ? "/welcome" : "/login"} />} />
      </Routes>
    </Router>
    
  );
}

export default App;