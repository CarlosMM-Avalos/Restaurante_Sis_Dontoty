import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Obtener info del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('http://localhost:8000/api/users/me/');
        setUser(res.data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <span style={{ marginRight: '20px' }}><strong>🍽️ Restaurante Don Toty</strong></span>

      {user.role === 'cliente' && (
        <>
        <Link to="/cliente/menu" style={{ marginRight: '10px' }}>Menú</Link>
        <Link to="/cliente/mis-pedidos" style={{ marginRight: '10px' }}>pedidos cliente</Link>
        <Link to="/cliente/historial" style={{ marginRight: '10px' }}>historial cliente</Link>
        </>)}
      
      {user.role === 'encargado' && (
        <>
        <Link to="/encargado/pedidos" style={{ marginRight: '10px' }}>Pedidos</Link>
        <Link to="/encargado/menu" style={{ marginRight: '10px' }}>Menús</Link> 
        <Link to="/encargado/menu" style={{marginRight: '10px' ,pointerEvents: 'none', color: 'gray', textDecoration: 'none', cursor: 'not-allowed' }}>proximamente</Link> 
        <Link to="/admin/historial" style={{ marginRight: '10px' }}>historial</Link>
         <Link to="/encargado/dashboard" style={{ marginRight: '10px' }}>dash encar</Link>
        </>)}

      {user.role === 'administrador' && (
        <>
        <Link to="/admin/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
        <Link to="/cliente/menu" style={{ marginRight: '10px' }}>Menus C</Link>
        <Link to="/encargado/pedidos" style={{ marginRight: '10px' }}>Pedidos</Link>
        <Link to="/encargado/menu" style={{ marginRight: '10px' }}>Menu E</Link>
        <Link to="/encargado/gestion-menu" style={{ marginRight: '10px' }}>Gestionar Platos</Link>
        <Link to="/cliente/mis-pedidos" style={{ marginRight: '10px' }}>pedidos cliente</Link>
        <Link to="/admin/historial" style={{ marginRight: '10px' }}>historial</Link>
        <Link to="/cliente/historial" style={{ marginRight: '10px' }}>historial cliente</Link>
        <Link to="/encargado/dashboard" style={{ marginRight: '10px' }}>dash encar</Link>


        
        </>
        )}

      <span style={{ marginLeft: '20px' }}>👤 {user.username} ({user.role})</span>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
