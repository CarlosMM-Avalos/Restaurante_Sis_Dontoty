import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const EncargadoPedidos = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  }
  
  return (
    <div>
      <Navbar />
      <h2>Gestión de Pedidos - Encargado</h2>
      <p>Vista para controlar pedidos, tiempos, etc.</p>
      <button onClick={handleLogout} >Cerrar sesión</button>
    </div>
  );
};

export default EncargadoPedidos;
