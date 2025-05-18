import React, { useState } from 'react';
import Button from '../componentes/Button';
import '../componentes/GestionarProductos.css';
import { useNavigate } from 'react-router-dom';

const mockProductos = [
  { id: 1, nombre: 'Paracetamol', descripcion: 'Analgésico', precio: 10, stock: 100, categoria: 'Analgésicos', marca: 'Genfar', receta: false, activo: true },
  { id: 2, nombre: 'Ibuprofeno', descripcion: 'Antiinflamatorio', precio: 15, stock: 50, categoria: 'Antiinflamatorios', marca: 'Bayer', receta: false, activo: true },
  { id: 3, nombre: 'Amoxicilina', descripcion: 'Antibiótico', precio: 25, stock: 0, categoria: 'Antibióticos', marca: 'Pfizer', receta: true, activo: true },
];

const GestionarProductos = () => {
  const [productos, setProductos] = useState(mockProductos);
  const [busqueda, setBusqueda] = useState('');
  const [productoEdit, setProductoEdit] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const handleEditar = (prod) => {
    setProductoEdit(prod);
    setModal(true);
  };

  const handleEliminar = (prod) => {
    if (prod.stock > 0) {
      alert('No se puede eliminar un producto con stock. Puede inactivarlo.');
      return;
    }
    setProductos(productos.map(p => p.id === prod.id ? { ...p, activo: false } : p));
  };

  const handleGuardar = () => {
    setProductos(productos.map(p => p.id === productoEdit.id ? productoEdit : p));
    setModal(false);
  };

  const handleInactivar = (prod) => {
    setProductos(productos.map(p => p.id === prod.id ? { ...p, activo: false } : p));
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="gestionar-productos-container">
      <h2 className="gestionar-productos-title">Gestionar Productos</h2>
      <div className="gestionar-productos-bar">
        <input
          className="gestionar-productos-input"
          type="text"
          placeholder="Buscar producto por nombre o descripción..."
          value={busqueda}
          onChange={handleBuscar}
        />
        <Button className="gestionar-productos-btn" onClick={() => navigate('/inventario/registrar-producto')}>Nuevo Producto / Actualizar</Button>
      </div>
      <div className="gestionar-productos-table-wrapper">
        <table className="gestionar-productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Receta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr><td colSpan="9" className="gp-empty">No se encontraron productos</td></tr>
            ) : (
              productosFiltrados.map(prod => (
                <tr key={prod.id} className={!prod.activo ? 'gp-inactivo' : ''}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.descripcion}</td>
                  <td>Bs {prod.precio}</td>
                  <td>{prod.stock}</td>
                  <td>{prod.categoria}</td>
                  <td>{prod.marca}</td>
                  <td>{prod.receta ? 'Sí' : 'No'}</td>
                  <td>{prod.activo ? 'Activo' : 'Inactivo'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal de edición/creación */}
      {modal && (
        <div className="gp-modal-bg">
          <div className="gp-modal">
            <h3>{modal === 'nuevo' ? 'Nuevo Producto' : 'Editar Producto'}</h3>
            {/* Aquí iría el formulario de edición/creación real */}
            <Button className="gestionar-productos-btn cancelar" onClick={() => setModal(false)}>Cancelar</Button>
            {modal !== 'nuevo' && <Button className="gestionar-productos-btn guardar" onClick={handleGuardar}>Guardar</Button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarProductos;
