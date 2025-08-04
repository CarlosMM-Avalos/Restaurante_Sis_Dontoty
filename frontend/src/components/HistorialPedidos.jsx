import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [cliente, setCliente] = useState('');
  const [estado, setEstado] = useState('');

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get(`http://localhost:8000/api/historial-pedidos/`, {
        params: {
          fecha: fecha || undefined,
          cliente: cliente || undefined,
          estado: estado || undefined
        }
      });

      setPedidos(res.data);
    } catch (error) {
      console.error("Error al obtener historial de pedidos", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div>
        <Navbar />

      <h2>Historial de Pedidos</h2>

      <label>Filtrar por fecha: </label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

      <label style={{marginLeft: "1rem"}}>Filtrar por ID de cliente: </label>
      <input type="number" value={cliente} onChange={(e) => setCliente(e.target.value)} />

      <label style={{marginLeft: "1rem"}}>Filtrar por estado: </label>
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_preparacion">En preparación</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>


      <button onClick={fetchPedidos}>Buscar</button>

      <ul>
        {pedidos.map(p => (
          <li key={p.id}>
            <strong>Cliente:</strong> {p.cliente_nombre} <br />
            <strong>Plato:</strong> {p.item_nombre} <br />
            <strong>Estado:</strong> {p.estado_display} <br />
            <strong>Fecha:</strong> {new Date(p.fecha).toLocaleString()} <br /><br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPedidos;
