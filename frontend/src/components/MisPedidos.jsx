import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    axios.get('http://localhost:8000/api/mis-pedidos/')
      .then(res => setPedidos(res.data))
      .catch(err => console.error('Error al cargar pedidos', err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No has realizado pedidos aún.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              <p><strong>Fecha:</strong> {pedido.fecha_formateada}</p>
              <p><strong>Estado:</strong> {pedido.estado_display}</p>
              <p><strong>Platos:</strong></p>
              <ul>
                {pedido.items.map(item => (
                  <li key={item.id}>
                    {item.menu_item_nombre} x {item.cantidad}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisPedidos;
