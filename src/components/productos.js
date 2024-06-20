import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/productos.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

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
          const sortedProductos = response.data.sort((a, b) => {
            return new Date(a.fechaExp) - new Date(b.fechaExp);
          });
          setProductos(sortedProductos);
        } else {
          setError('La respuesta de la API no es un arreglo válido');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchProductos, 5000);

    return () => clearInterval(interval);
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
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Fecha expiración</th>
            <th>Ultima extracción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.codigo}</td>
              <td>{producto.cantidad}</td>
              <td>{formatDate(producto.fechaExp)}</td>
              <td>{formatDate(producto.ultimaExt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;