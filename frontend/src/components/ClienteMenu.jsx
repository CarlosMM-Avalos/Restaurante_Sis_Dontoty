import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ClienteMenu = () => {
  const [menu, setMenu] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/menu-del-dia/');
        setMenu(res.data);
      } catch (error) {
        console.error('Error al cargar menú:', error);
      }
    };

    fetchMenu();
  }, []);

  const pedirItem = async (itemId) => {
    try {
      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await axios.post('http://localhost:8000/api/crear-pedido/', {
        item: itemId,
      });

      setMensaje('✅ Pedido realizado con éxito');
    } catch (error) {
      setMensaje('❌ Error al realizar el pedido');
      console.error('Error en pedido:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>🍽️ Menú del Día</h2>

      {mensaje && <p>{mensaje}</p>}

      {menu.length === 0 ? (
        <p>No hay menú disponible hoy.</p>
      ) : (
        <ul>
          {menu.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <strong>{item.nombre}</strong>: {item.descripcion} - ${item.precio}
              <button
                onClick={() => pedirItem(item.id)}
                style={{ marginLeft: '10px' }}
              >
                Pedir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteMenu;
