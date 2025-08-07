import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import Navbar from "./Navbar";
import './ChartResumenPedidos.jsx'
import ChartResumenPedidos from "./ChartResumenPedidos.jsx";

const ResumenDiarioAdmin = () => {
  const [resumen, setResumen] = useState([]);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:8000/api/resumen-diario/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumen(res.data);
      } catch (error) {
        console.error("Error al cargar el resumen diario", error);
      }
    };

    fetchResumen();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>📊 Resumen Diario de Pedidos</h2>

      {/* 🧾 Tabla */}
      <table border="1" style={{ width: "100%", marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total de Pedidos</th>
            <th>Plato Más Pedido</th>
          </tr>
        </thead>
        <tbody>
          {resumen.map((r, i) => (
            <tr key={i}>
              <td>{r.fecha}</td>
              <td>{r.total_pedidos}</td>
              <td>{r.plato_mas_pedido}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📊 Gráfico */}
      <h3>🍽 Cantidad por Plato (última fecha)</h3>
      {resumen.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.entries(resumen[0].total_por_plato).map(([nombre, cantidad]) => ({
            nombre,
            cantidad
          }))}>
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
     <ChartResumenPedidos />

    </div>
  );
};

export default ResumenDiarioAdmin;
