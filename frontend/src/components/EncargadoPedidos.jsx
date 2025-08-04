import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const EncargadoPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem('access_token');






  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/pedidos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(res.data);
      } catch (err) {
        console.error('Error al obtener pedidos:', err);
      }
    };
    fetchPedidos();
  }, []);

 const actualizarEstado = async (id, nuevoEstado) => {
  try {
    const token = localStorage.getItem('access_token');
    await axios.patch(`http://localhost:8000/api/pedidos/${id}/`, {
      estado: nuevoEstado
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // 🔁 Volver a obtener los pedidos actualizados
    const res = await axios.get('http://localhost:8000/api/pedidos/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPedidos(res.data); // ✅ se actualiza todo, incluido estado_display

  } catch (err) {
    console.error('Error al actualizar estado:', err);
  }
};


  return (
    <div>
      <Navbar />
      <h2>📦 Pedidos Recibidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <p><strong>Cliente:</strong> {pedido.cliente_nombre}</p>
            <p><strong>Plato:</strong> {pedido.item_nombre}</p>
            <p><strong>Estado:</strong> {pedido.estado_display}</p>
            <p><strong>Fecha del pedido:</strong> {new Date(pedido.fecha).toLocaleString()}</p>

            
            <select
              value={pedido.estado}
              onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo para entregar</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EncargadoPedidos;

