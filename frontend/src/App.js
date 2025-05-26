import { useEffect, useState } from 'react';
import {
  obtenerPreparaciones,
  crearPreparacion,
  eliminarPreparacion,
  actualizarPreparacion,
} from './services/api';
import './App.css';

function App() {
  const [preparaciones, setPreparaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarPreparaciones();
  }, []);

  const cargarPreparaciones = () => {
    obtenerPreparaciones()
      .then((res) => setPreparaciones(res.data))
      .catch((err) =>
        console.error('Error cargando preparaciones:', err)
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      // Modo edición
      actualizarPreparacion(idEditando, formData)
        .then(() => {
          resetFormulario();
          cargarPreparaciones();
        })
        .catch((err) =>
          console.error('Error al actualizar preparación:', err)
        );
    } else {
      // Modo creación
      crearPreparacion(formData)
        .then(() => {
          resetFormulario();
          cargarPreparaciones();
        })
        .catch((err) =>
          console.error('Error al crear preparación:', err)
        );
    }
  };

  const resetFormulario = () => {
    setFormData({ nombre: '', descripcion: '', precio: '' });
    setModoEdicion(false);
    setIdEditando(null);
  };

  const handleEditar = (prep) => {
    setFormData({
      nombre: prep.nombre,
      descripcion: prep.descripcion,
      precio: prep.precio,
    });
    setModoEdicion(true);
    setIdEditando(prep.id);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar esta preparación?')) {
      eliminarPreparacion(id)
        .then(() => cargarPreparaciones())
        .catch((err) =>
          console.error('Error al eliminar la preparación:', err)
        );
    }
  };

  return (
    <div className="App">
      <h1>📋 LISTADO DE PREPARACIONES</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          step="0.01"
          value={formData.precio}
          onChange={handleChange}
        />
        <button type="submit">{modoEdicion ? 'Guardar Cambios' : 'Agregar'}</button>
        {modoEdicion && (
          <button type="button" onClick={resetFormulario} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        )}
      </form>

      <ul>
        {preparaciones.map((prep) => (
          <li key={prep.id}>
            <strong>{prep.nombre}</strong> - {prep.descripcion} (${prep.precio})
            <button onClick={() => handleEditar(prep)} style={{ marginLeft: '1rem' }}>
              ✏ Editar
            </button>
            <button onClick={() => handleEliminar(prep.id)} style={{ marginLeft: '0.5rem' }}>
              🗑 Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
