import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Obtener tokens
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // 2. Configurar token para siguiente request
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      // 3. Obtener datos del usuario actual
      const userRes = await axios.get('http://localhost:8000/api/me/');
      const rol = userRes.data.role;

      // 4. Redirigir según rol
      if (rol === 'cliente') {
        navigate('/cliente/menu');
      } else if (rol === 'encargado') {
        navigate('/encargado/pedidos');
      } else if (rol === 'administrador') {
        navigate('/admin/dashboard');
      } else {
        navigate('/welcome'); // fallback
      }

      setMensaje('Login exitoso');

    } catch (error) {
      setMensaje('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;
