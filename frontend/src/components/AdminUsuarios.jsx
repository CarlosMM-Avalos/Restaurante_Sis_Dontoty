import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const token = localStorage.getItem("access_token");
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    email: '',
    password: '',
    role: 'cliente'
    });
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  const abrirModal = (usuario) => {
    setUsuarioActual(usuario);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setUsuarioActual(null);
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    setUsuarioActual({
      ...usuarioActual,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCambios = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/users/${usuarioActual.id}/`, {
        username: usuarioActual.username,
        role: usuarioActual.role,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cerrarModal();
      fetchUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    }
  };


  const crearUsuario = async () => {
  try {
    const token = localStorage.getItem('access_token');
    await axios.post('http://localhost:8000/api/admin/usuarios/', nuevoUsuario, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsuarios(); // recargar lista
    alert('Usuario creado con éxito');
  } catch (err) {
    console.error('Error al crear usuario', err);
    alert('Hubo un error');
  }
};

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>👤 Panel de Usuarios</h2>
      <h3>Crear nuevo usuario</h3>
<input type="text" placeholder="Username" onChange={e => setNuevoUsuario({...nuevoUsuario, username: e.target.value})} />
<input type="email" placeholder="Email" onChange={e => setNuevoUsuario({...nuevoUsuario, email: e.target.value})} />
<input type="password" placeholder="Contraseña" onChange={e => setNuevoUsuario({...nuevoUsuario, password: e.target.value})} />
<select onChange={e => setNuevoUsuario({...nuevoUsuario, role: e.target.value})}>
  <option value="cliente">Cliente</option>
  <option value="encargado">Encargado</option>
  <option value="administrador">Administrador</option>
</select>
<button onClick={crearUsuario}>Crear usuario</button>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.role}</td>
              <td>
                <button onClick={() => abrirModal(usuario)}>✏️ Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar */}
      {modalVisible && (
        <div style={modalEstilo}>
          <h3>Editar Usuario</h3>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={usuarioActual.username}
            onChange={handleInputChange}
          />
          <br />
          <label>Rol:</label>
          <select
            name="role"
            value={usuarioActual.role}
            onChange={handleInputChange}
          >
            <option value="cliente">Cliente</option>
            <option value="encargado">Encargado</option>
            <option value="administrador">Administrador</option>
          </select>
          <br /><br />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={cerrarModal} style={{ marginLeft: '10px' }}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

const modalEstilo = {
  position: 'fixed',
  top: '25%',
  left: '35%',
  width: '30%',
  padding: '20px',
  backgroundColor: 'white',
  border: '1px solid gray',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  zIndex: 1000,
};

export default AdminUsuarios;
