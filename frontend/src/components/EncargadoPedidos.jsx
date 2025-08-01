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
      await axios.patch(`http://localhost:8000/api/pedidos/${id}/`, { estado: nuevoEstado }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
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
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <p><strong>Plato:</strong> {pedido.item}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
            <select
              value={pedido.estado}
              onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo para entregar</option>
              <option value="entregado">Entregado</option>
            </select>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EncargadoPedidos;

