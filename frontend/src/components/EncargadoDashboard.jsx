import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import GestionarDisponibilidadMenu from './GestionarDisponibilidadMenu.jsx';

const EncargadoDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [menuHoy, setMenuHoy] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchPedidos();
    fetchMenuHoy();
  }, []);

  const fetchPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/pedidos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPedidos(res.data);
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
    }
  };

  const fetchMenuHoy = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/menu-del-dia/");
      setMenuHoy(res.data);
    } catch (err) {
      console.error("Error al obtener menú del día:", err);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await axios.patch(`http://localhost:8000/api/pedidos/${id}/`, {
        estado: nuevoEstado,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPedidos();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>📋 Panel del Encargado</h2>
      <GestionarDisponibilidadMenu />
      <section>
        <h3>📦 Pedidos actuales</h3>
        {pedidos.length === 0 ? <p>No hay pedidos aún.</p> : (
          <ul>
            {pedidos.map(p => (
              <li key={p.id}>
                <p><strong>Cliente:</strong> {p.cliente_nombre}</p>
                <p><strong>Fecha:</strong> {p.fecha_formateada}</p>
                <p><strong>Estado:</strong> {p.estado_display}</p>
                <p><strong>Platos:</strong></p>
                <ul>
                  {p.items.map((item, i) => (
                    <li key={i}>{item.menu_item_nombre} x {item.cantidad}</li>
                  ))}
                </ul>
                <select value={p.estado} onChange={(e) => actualizarEstado(p.id, e.target.value)}>
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
        )}
      </section>

      <section>
        <h3>🍽️ Menú del día</h3>
        {menuHoy.length === 0 ? <p>No hay menú disponible hoy.</p> : (
          <ul>
            {menuHoy.map((item) => (
              <li key={item.id}>{item.nombre} - ${item.precio}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EncargadoDashboard;
