import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const ClienteMenu = () => {
  const [menu, setMenu] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Obtener menú del día
  useEffect(() => {
    axios.get("http://localhost:8000/api/menu-del-dia/")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error("Error cargando menú", err));
  }, []);

  const agregarAlCarrito = (plato) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.menu_item === plato.id);
      if (existente) {
        return prev.map(p =>
          p.menu_item === plato.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { menu_item: plato.id, cantidad: 1 }];
      }
    });
  };

  const disminuirCantidad = (menu_item_id) => {
    setCarrito(prev =>
      prev
        .map(p => p.menu_item === menu_item_id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (menu_item_id) => {
    setCarrito(prev =>
      prev.filter(p => p.menu_item !== menu_item_id)
    );
  };

  const confirmarPedido = async () => {
    try {
      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const res = await axios.post("http://localhost:8000/api/crear-pedido/", {
        items: carrito
      });

      alert("¡Pedido enviado con éxito!");
      setCarrito([]);
    } catch (error) {
      console.error("Error al enviar pedido", error);
      alert("Error al enviar pedido");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Menú del Día</h2>
      <ul>
        {menu.map(plato => (
          <li key={plato.id}>
            <strong>{plato.nombre}</strong> - ${plato.precio}
            <button onClick={() => agregarAlCarrito(plato)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <p>No hay platos seleccionados.</p>
      ) : (
        <ul>
          {carrito.map(item => {
            const plato = menu.find(p => p.id === item.menu_item);
            return (
              <li key={item.menu_item}>
                {plato?.nombre} x {item.cantidad}
                <button onClick={() => agregarAlCarrito(plato)}>➕</button>
                <button onClick={() => disminuirCantidad(item.menu_item)}>➖</button>
                <button onClick={() => eliminarDelCarrito(item.menu_item)}>🗑️</button>
              </li>
            );
          })}
        </ul>
      )}

      <button disabled={carrito.length === 0} onClick={confirmarPedido}>
        Confirmar Pedido
      </button>
    </div>
  );
};

export default ClienteMenu;
