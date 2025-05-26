import axios from 'axios';

const API = axios.create({
    baseURL:'http://localhost:8000/api/',
});

// llama la data de la api
export const obtenerPreparaciones = () => 
    API.get('preparaciones/');
// envia nueva data a la api
export const crearPreparacion = (nuevaPreparacion) =>
    API.post('preparaciones/',nuevaPreparacion);
// elimina data de la api
export const eliminarPreparacion = (id) =>
    API.delete(`preparaciones/${id}/`);
// editar data de la api
export const actualizarPreparacion = (id, datos) =>
    API.put(`preparaciones/${id}/`, datos);
