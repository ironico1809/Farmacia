import React, { useState } from 'react';
import Button from '../componentes/Button';
import '../componentes/RegistrarProducto.css';

const initialState = {
  ID: '',
  Nombre: '',
  Descripcion: '',
  Forma_Farmaceutica: '',
  Concentracion: '',
  Via_Administracion: '',
  Oferta: false,
  Precio_Compra: '',
  Precio_Venta: '',
  Stock: '',
  Receta: false,
  MarcaID: '',
  CategoriaID: '',
};

const opcionesForma = [
  'Tableta', 'Cápsula', 'Jarabe', 'Inyectable', 'Crema', 'Gel', 'Óvulo', 'Solución', 'Polvo', 'Otro'
];
const opcionesVia = [
  'Oral', 'Tópica', 'Intravenosa', 'Intramuscular', 'Sublingual', 'Oftálmica', 'Rectal', 'Otro'
];

const RegistrarProducto = () => {
  const [producto, setProducto] = useState(initialState);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerta(modoEdicion ? 'Producto actualizado correctamente' : 'Producto registrado correctamente');
    setTimeout(() => setAlerta(null), 2500);
    setProducto(initialState);
    setModoEdicion(false);
  };

  // Simulación de cargar producto para editar (en real, buscaría por ID)
  const handleBuscar = () => {
    setProducto({
      ID: '1',
      Nombre: 'Paracetamol',
      Descripcion: 'Analgésico',
      Forma_Farmaceutica: 'Tableta',
      Concentracion: '500mg',
      Via_Administracion: 'Oral',
      Oferta: true,
      Precio_Compra: '5.00',
      Precio_Venta: '10.00',
      Stock: '100',
      Receta: false,
      MarcaID: '1',
      CategoriaID: '2',
    });
    setModoEdicion(true);
  };

  return (
    <div className="registrar-producto-container">
      <h2 className="registrar-producto-title">{modoEdicion ? 'ACTUALIZAR PRODUCTO' : 'REGISTRAR PRODUCTO'}</h2>
      <form className="registrar-producto-form" onSubmit={handleSubmit}>
        <div className="registrar-producto-buscar-row">
          <input className="registrar-producto-input registrar-producto-input-id" name="ID" type="text" placeholder="ID (para actualizar)" value={producto.ID} onChange={handleChange} style={{maxWidth:320, fontSize:'1.13rem', letterSpacing:'1px'}} />
          <Button className="registrar-producto-btn" type="button" onClick={handleBuscar}>Buscar</Button>
          <span>Dejar vacío para registrar nuevo</span>
        </div>
        <input className="registrar-producto-input" name="Nombre" type="text" placeholder="Nombre del producto" value={producto.Nombre} onChange={handleChange} required style={{gridColumn:'1/3'}} />
        <input className="registrar-producto-input" name="Descripcion" type="text" placeholder="Descripción" value={producto.Descripcion} onChange={handleChange} style={{gridColumn:'1/3'}} />
        <select className="registrar-producto-select" name="Forma_Farmaceutica" value={producto.Forma_Farmaceutica} onChange={handleChange} required>
          <option value="">Forma Farmacéutica</option>
          {opcionesForma.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <input className="registrar-producto-input" name="Concentracion" type="text" placeholder="Concentración (ej: 500mg)" value={producto.Concentracion} onChange={handleChange} />
        <select className="registrar-producto-select" name="Via_Administracion" value={producto.Via_Administracion} onChange={handleChange} required>
          <option value="">Vía de Administración</option>
          {opcionesVia.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <div style={{display:'flex',gap:'1.2rem',alignItems:'center',gridColumn:'1/3',margin:'0.2rem 0 0.5rem 0'}}>
          <label className="registrar-producto-switch">
            <input type="checkbox" name="Oferta" checked={producto.Oferta} onChange={handleChange} />
            <span className="registrar-producto-slider"></span>
            <span className="registrar-producto-switch-label">Oferta</span>
          </label>
          <label className="registrar-producto-switch">
            <input type="checkbox" name="Receta" checked={producto.Receta} onChange={handleChange} />
            <span className="registrar-producto-slider"></span>
            <span className="registrar-producto-switch-label">Requiere Receta</span>
          </label>
        </div>
        <input className="registrar-producto-input" name="Precio_Compra" type="number" step="0.01" placeholder="Precio Compra (Bs)" value={producto.Precio_Compra} onChange={handleChange} required />
        <input className="registrar-producto-input" name="Precio_Venta" type="number" step="0.01" placeholder="Precio Venta (Bs)" value={producto.Precio_Venta} onChange={handleChange} required />
        <input className="registrar-producto-input" name="Stock" type="number" placeholder="Stock" value={producto.Stock} onChange={handleChange} required />
        <input className="registrar-producto-input" name="MarcaID" type="text" placeholder="Marca" value={producto.MarcaID} onChange={handleChange} />
        <input className="registrar-producto-input" name="CategoriaID" type="text" placeholder="Categoría" value={producto.CategoriaID} onChange={handleChange} />
        <div className="registrar-producto-actions">
          <Button className="registrar-producto-btn" type="submit" disabled={false}>{modoEdicion ? 'Actualizar' : 'Registrar'}</Button>
          <Button className="registrar-producto-btn cancelar" type="button" onClick={() => { setProducto(initialState); setModoEdicion(false); }}>Limpiar</Button>
        </div>
        {alerta && <div className="registrar-producto-alert">{alerta}</div>}
      </form>
    </div>
  );
};

export default RegistrarProducto;
