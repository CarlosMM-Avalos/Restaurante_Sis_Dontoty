import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const ClienteMenu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');

  }
  return (
    <div>
      <Navbar />
      <h2>Menú del Cliente</h2>
      <p>Aquí va el menú disponible para pedir.</p>
      <button onClick={handleLogout} >Cerrar sesión</button>
    </div>
  );
};

export default ClienteMenu;
