import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionarDisponibilidadMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchItems = async () => {
    const token = localStorage.getItem("access_token");
    const res = await axios.get("http://localhost:8000/api/menu-items/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setMenuItems(res.data);
  };

  const toggleDisponibilidad = async (id, disponible_hoy) => {
    const token = localStorage.getItem("access_token");
    await axios.patch(`http://localhost:8000/api/menu-items/${id}/disponibilidad/`, 
      { disponible_hoy: !disponible_hoy }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchItems(); // refrescar lista
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h3>🧾 Gestionar Menú del Día</h3>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <strong>{item.nombre}</strong> — Disponible hoy: 
            <input 
              type="checkbox" 
              checked={item.disponible_hoy} 
              onChange={() => toggleDisponibilidad(item.id, item.disponible_hoy)} 
              style={{ marginLeft: "10px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionarDisponibilidadMenu;
