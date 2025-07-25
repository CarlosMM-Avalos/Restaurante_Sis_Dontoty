import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const AdminDashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };
  return (

   

    <div>
      <Navbar />
      <h2>Panel de Administraciónn</h2>
      <p>Vista para gestionar usuarios, estadísticas, etc.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
    
  );
};

export default AdminDashboard;
