import { useEffect, useState } from 'react';
import {
  obtenerPreparaciones,
  crearPreparacion,
  eliminarPreparacion,
  actualizarPreparacion,
} from './services/api';
import './App.css';
import Login from './components/Login';
import Welcome from './components/Welcome';
function App() {
  const token = localStorage.getItem('access_token');
  return(

  <div>
    
     {token ? <Welcome /> : <Login />}
    
  </div>
  );
}

export default App;
