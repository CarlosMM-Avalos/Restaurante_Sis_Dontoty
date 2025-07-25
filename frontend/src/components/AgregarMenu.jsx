import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AgregarMenu = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    disponible_hoy: false,
  });
  const [mensaje, setMensaje] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      await axios.post('http://localhost:8000/api/menu-items/', form);
      setMensaje('✅ Menú agregado correctamente');
      setForm({ nombre: '', descripcion: '', precio: '', disponible_hoy: false });
      fetchMenuItems(); // para recargar la lista
    } catch (error) {
      console.error('Error al agregar menú:', error);
      setMensaje('❌ Error al agregar menú');
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/menu-items/');
      setMenuItems(res.data);
    } catch (error) {
      console.error('Error al obtener menús:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>📋 Agregar nuevo menú</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="disponible_hoy"
            checked={form.disponible_hoy}
            onChange={handleChange}
          />{' '}
          Disponible hoy
        </label>
        <br />
        <button type="submit">Agregar menú</button>
      </form>

      <h3>📌 Menús actuales:</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.nombre} - ${item.precio} - {item.disponible_hoy ? '✅ Hoy' : '❌ No hoy'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgregarMenu;
