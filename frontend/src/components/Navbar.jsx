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
        const res = await axios.get('http://localhost:8000/api/me/');
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
      <span style={{ marginRight: '20px' }}><strong>🍽️ Restaurante</strong></span>

      {user.role === 'cliente' && <Link to="/cliente/menu">Menú</Link>}
      {user.role === 'encargado' && <Link to="/encargado/pedidos">Pedidos</Link>}
      {user.role === 'administrador' && <Link to="/admin/dashboard">Dashboard</Link>}

      <span style={{ marginLeft: '20px' }}>👤 {user.username} ({user.role})</span>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
