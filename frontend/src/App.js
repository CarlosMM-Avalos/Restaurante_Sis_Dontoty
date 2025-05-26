import './App.css';
import { useEffect, useState } from 'react';
import { obtenerPreparaciones } from './services/api';



function App() {
  const [preparaciones, setPreparaciones] = useState([])

  useEffect(() =>{
    obtenerPreparaciones()
    .then(rest => setPreparaciones(rest.data))
    .catch(err => console.error('Las preparaciones no estan siendo cargadas correctamente',err));
    }, []);



  return (
    <div className="App">
      <h1>LISTADO DE PREPARACIONES</h1>
      <ul>
        {preparaciones.map(prep =>(
          <li key={prep.id}>PLATO :{prep.nombre} ES :{prep.descripcion} VALOR :{prep.nombre}{prep.precio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
