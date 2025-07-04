import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Welcome = () => {
  const [user, setUser] = useState(null);

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
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div>
      <h2>¡Bienvenido, {user.username}!</h2>
      <p>Tu rol es: {user.role}</p>
    </div>
  );
};

export default Welcome;
