import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  const cancelarPedido = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    await axios.patch(`http://localhost:8000/api/cancelar-pedido/${id}/`, {
      estado: 'cancelado'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Actualizar la lista
    const res = await axios.get("http://localhost:8000/api/mis-pedidos/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPedidos(res.data);

  } catch (err) {
    console.error("Error al cancelar el pedido:", err);
  }
};


  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:8000/api/mis-pedidos/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPedidos(res.data);
      } catch (err) {
        console.error("Error al cargar pedidos del cliente:", err);
      }
    };

    fetchPedidos();
  }, []);

  

  return (
    <div>
        <Navbar />
      <h2>Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        <ul>
          {pedidos.map(pedido => (
            <li key={pedido.id}>
              {pedido.item_nombre} - Estado: <strong>{pedido.estado_display}</strong>

              {pedido.estado === 'pendiente' && (
  <button onClick={() => cancelarPedido(pedido.id)} style={{marginLeft: '10px'}}>
    Cancelar
  </button>
)}
            </li>
            
            
          ))  }
        </ul>
      )}
    </div>
  );
};

export default MisPedidos;
