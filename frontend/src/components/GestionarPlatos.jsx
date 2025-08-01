import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const GestionarPlatos = () => {
  const [platos, setPlatos] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    disponible_hoy: false,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const obtenerPlatos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/menu-items/');
      setPlatos(res.data);
    } catch (error) {
      console.error('Error al cargar platos:', error);
    }
  };

  useEffect(() => {
    obtenerPlatos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:8000/api/menu-items/${editandoId}/`, form);
        setMensaje('✅ Plato editado correctamente');
      } else {
        await axios.post('http://localhost:8000/api/menu-items/', form);
        setMensaje('✅ Plato creado correctamente');
      }
      setForm({ nombre: '', descripcion: '', precio: '', disponible_hoy: false });
      setEditandoId(null);
      obtenerPlatos();
    } catch (error) {
      console.error('Error al guardar plato:', error);
      setMensaje('❌ Error al guardar plato');
    }
  };

  const editarPlato = (plato) => {
    setForm({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: plato.precio,
      disponible_hoy: plato.disponible_hoy,
    });
    setEditandoId(plato.id);
  };

  const eliminarPlato = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este plato?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/menu-items/${id}/`);
      setMensaje('✅ Plato eliminado');
      obtenerPlatos();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMensaje('❌ Error al eliminar plato');
    }
  };

  const toggleDisponible = async (plato) => {
    try {
      await axios.patch(`http://localhost:8000/api/menu-items/${plato.id}/`, {
        disponible_hoy: !plato.disponible_hoy,
      });
      obtenerPlatos();
    } catch (error) {
      console.error('Error al cambiar disponibilidad:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>📋 Gestión de Platos</h2>
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
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'} Plato</button>
      </form>

      <h3>📌 Platos registrados:</h3>
      <ul>
        {platos.map((plato) => (
          <li key={plato.id}>
            <strong>{plato.nombre}</strong> - ${plato.precio} -{' '}
            {plato.disponible_hoy ? '✅ Hoy' : '❌ No hoy'}
            <br />
            <button onClick={() => editarPlato(plato)}>✏️ Editar</button>
            <button onClick={() => eliminarPlato(plato.id)}>🗑️ Eliminar</button>
            <button onClick={() => toggleDisponible(plato)}>
              {plato.disponible_hoy ? 'Quitar de hoy' : 'Marcar como hoy'}
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionarPlatos;
