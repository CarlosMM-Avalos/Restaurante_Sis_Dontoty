import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartResumenPedidos = () => {
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchResumen = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get('http://localhost:8000/api/resumen-pedidos-estados/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const labels = res.data.map(d => d.estado);
      const valores = res.data.map(d => d.total);

      setDatos({
        labels,
        datasets: [
          {
            label: 'Cantidad de Pedidos',
            data: valores,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderWidth: 1,
          }
        ]
      });
    };

    fetchResumen();
  }, []);

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <h3>📊 Pedidos por Estado</h3>
      {datos.labels ? (
        <Bar data={datos} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
            }
          }
        }} />
      ) : (
        <p>Cargando gráfico...</p>
      )}
    </div>
  );
};

export default ChartResumenPedidos;