// productos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productos');
        console.log('Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setError('La respuesta de la API no es un arreglo válido');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchProductos, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productos-container">
      <h1>Lista de Productos</h1>
      {console.log('Datos a renderizar:', productos)}
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.codigo}</td>
              <td>{producto.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;