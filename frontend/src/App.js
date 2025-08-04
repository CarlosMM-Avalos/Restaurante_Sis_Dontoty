import { useEffect, useState } from 'react';
import {
  obtenerPreparaciones,
  crearPreparacion,
  eliminarPreparacion,
  actualizarPreparacion,
} from './services/api';
import './App.css';
// componentes
import Login from './components/Login';
import Welcome from './components/Welcome';
import ClienteMenu from './components/ClienteMenu';
import EncargadoPedidos from './components/EncargadoPedidos';
import AdminDashboard from './components/AdminDashboard';
import PaginaMantencion from './components/PaginaMantencion';
import PrivateRoute from './components/PrivateRoute';
import AgregarMenu from './components/AgregarMenu';
import GestionarPlatos from './components/GestionarPlatos';
import MisPedidos from './components/MisPedidos';
import HistorialPedidos from './components/HistorialPedidos';
// ///////////////////////////////////////

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const token = localStorage.getItem('access_token');
  return(
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome" element={token ? <Welcome /> : <Navigate to="/login" />} />

         {/* Nuevas rutas protegidas por token */}
        {/* <Route path="/mantencion" element={token ? <PaginaMantencion /> : <Navigate to="/login" />} /> */}

        <Route path="/cliente/menu" element={
          <PrivateRoute allowedRoles={['cliente', 'administrador']}>
            <ClienteMenu />
          </PrivateRoute>}/>

        <Route path="/encargado/pedidos" element={
          <PrivateRoute allowedRoles={['encargado', 'administrador']}>
            <EncargadoPedidos/>
          </PrivateRoute>} />

        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['administrador']}>
            <AdminDashboard/>
          </PrivateRoute>} />
        

        <Route path="/encargado/menu" element={
          <PrivateRoute allowedRoles={['encargado', 'administrador']}>
            <AgregarMenu />
          </PrivateRoute>} />
        

        <Route path="/encargado/gestion-menu" element={
          <PrivateRoute allowedRoles={['encargado', 'administrador']}>
            <GestionarPlatos />
          </PrivateRoute> } />

          
        <Route path="/cliente/mis-pedidos" element={
          <PrivateRoute allowedRoles={['cliente', 'administrador']}>
            <MisPedidos />
          </PrivateRoute> } />


        <Route path="/admin/historial" element={
          <PrivateRoute allowedRoles={['administrador', 'encargado']}>
            <HistorialPedidos />
          </PrivateRoute> } />


          






        {/* otros */}
        <Route path="*" element={
          <Navigate to={token ? "/welcome" : "/login"} />} />
      </Routes>
    </Router>
    
  );
}

export default App;