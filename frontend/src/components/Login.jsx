import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // evitar recarga

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      });

      const { access, refresh } = response.data;

      // Guardamos los tokens en localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Configuramos Axios con el token automáticamente
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // Redirigir o mostrar mensaje
      alert("¡Login exitoso!");
      // Ejemplo: window.location.href = "/dashboard";
      window.location.reload();
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
