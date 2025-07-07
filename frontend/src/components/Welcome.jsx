import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/me/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div>
      <h2>¡Bienvenido, {user.username}!</h2>
      <p>Tu rol es: {user.role}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Welcome;
