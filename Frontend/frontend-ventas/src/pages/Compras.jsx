// Página de Compras: muestra todos los productos de la base de datos (mock desde SQL)
import React, { useState } from 'react';
import '../componentes/Compras.css';

// Mock de imágenes para productos (puedes reemplazar por URLs reales)
const imagenes = {
  'AMOXIFAR DUO': '/Productos/AMOXIFAR%20DUO.jpg',
  'BAMMOX': '/Productos/BAMMOX.jpg',
  'DOLOTERM': '/Productos/DOLOTERM.jpg',
  'FLOGIATRIN B12': '/Productos/FLOGIATRIN%20B12.jpg',
  'ALCOHOL 70%': '/Productos/ALCOHOL%2070%25.jpg',
  'DIGESTAN': '/Productos/DIGESTAN.jpg',
  'REFRIANEX DIA': '/Productos/REFRIANEX%20DIA.jpg',
  'PARACETAMOL': '/Productos/PARACETAMOL.jpg',
  'IBUPROFENO': '/Productos/IBUPROFENO.jpg',
  'T36 PLUS': '/Productos/T36%20PLUS.jpg',
  'LORATADINA': '/Productos/LORATADINA.jpg',
  'PRESERVATIVO': '/Productos/PRESERVATIVO.webp',
};

// Productos mockeados desde la base de datos SQL
const productos = [
  { id: 1015, nombre: 'AMOXIFAR DUO', descripcion: 'Amoxicilina 1G', forma: 'Suspensión', concentracion: '60ml', via: 'Oral', precioCompra: 30.00, precioVenta: 40.00, stock: 0 },
  { id: 2025, nombre: 'BAMMOX', descripcion: 'Amoxicilina + Sulbactam', forma: 'Suspensión', concentracion: '1000/250mg', via: 'Oral', precioCompra: 35.00, precioVenta: 45.00, stock: 0 },
  { id: 3035, nombre: 'DOLOTERM', descripcion: 'Ibuprofeno', forma: 'Suspensión', concentracion: '200mg/100ml', via: 'Oral', precioCompra: 20.00, precioVenta: 25.00, stock: 0 },
  { id: 7075, nombre: 'FLOGIATRIN B12', descripcion: 'Piroxicam + Vitaminas', forma: 'Inyectable', concentracion: '20mg', via: 'Intramuscular', precioCompra: 53.00, precioVenta: 65.00, stock: 1 },
  { id: 8085, nombre: 'ALCOHOL 70%', descripcion: 'Antiséptico', forma: 'Gel', concentracion: '120ml', via: 'Tópica', precioCompra: 4.00, precioVenta: 5.00, stock: 3 },
  { id: 1010, nombre: 'DIGESTAN', descripcion: 'Combinación digestiva', forma: 'Comprimido', concentracion: 'Compuesto', via: 'Oral', precioCompra: 8.80, precioVenta: 11.00, stock: 9 },
  { id: 1115, nombre: 'REFRIANEX DIA', descripcion: 'Antigripal', forma: 'Sobres', concentracion: 'Naranja-Miel', via: 'Oral', precioCompra: 3.50, precioVenta: 6.00, stock: 14 },
  { id: 1745, nombre: 'PARACETAMOL', descripcion: 'Analgésico/antipirético', forma: 'Comprimido', concentracion: '500mg', via: 'Oral', precioCompra: 1.30, precioVenta: 2.00, stock: 14 },
  { id: 1850, nombre: 'IBUPROFENO', descripcion: 'Antiinflamatorio', forma: 'Comprimido', concentracion: '400mg', via: 'Oral', precioCompra: 2.00, precioVenta: 3.00, stock: 10 },
  { id: 2060, nombre: 'T36 PLUS', descripcion: 'Disfunción eréctil + Eyaculación precoz', forma: 'Comprimido', concentracion: '20/60mg', via: 'Oral', precioCompra: 2.20, precioVenta: 5.00, stock: 3 },
  { id: 4480, nombre: 'LORATADINA', descripcion: 'Antihistamínico', forma: 'Comprimido', concentracion: '10mg', via: 'Oral', precioCompra: 3.50, precioVenta: 4.00, stock: 21 },
  { id: 3535, nombre: 'PRESERVATIVO', descripcion: 'Profiláctico', forma: 'Unidad', concentracion: '38mm', via: 'Tópica', precioCompra: 3.33, precioVenta: 5.00, stock: 27 },
];

export default function Compras() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [zoomImg, setZoomImg] = useState(null); // {src, nombre}

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    // Ya no abre el modal automáticamente
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) => prev.map((p) =>
      p.id === id ? { ...p, cantidad: Math.max(1, cantidad) } : p
    ));
  };

  const total = carrito.reduce((acc, p) => acc + p.precioVenta * p.cantidad, 0);

  React.useEffect(() => {
    if (!zoomImg) return;
    const handler = (e) => {
      if (e.key === 'Escape') setZoomImg(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomImg]);

  return (
    <div className="compras-main">
      <h1 className="compras-title">Catálogo de Productos</h1>
      <div className="compras-grid">
        {productos.map((p) => (
          <div className="compras-card" key={p.id}>
            <img
              className="compras-img"
              src={imagenes[p.nombre] || imagenes['AMOXIFAR DUO']}
              alt={p.nombre}
              style={{cursor:'pointer'}}
              onError={e => { e.target.onerror = null; e.target.src = 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png'; }}
            />
            <div className="compras-nombre">{p.nombre}</div>
            <div className="compras-descripcion">{p.descripcion}</div>
            <div className="compras-info">
              <span>{p.forma} &bull; {p.concentracion} &bull; {p.via}</span>
            </div>
            <div className="compras-precio">Bs {p.precioVenta.toFixed(2)}</div>
            {p.stock > 0 ? (
              <>
                <div className="compras-stock">Stock: {p.stock}</div>
                <button className="compras-btn" onClick={() => agregarAlCarrito(p)}>
                  <i className="fa fa-cart-plus" style={{marginRight:8}}></i>Agregar al carrito
                </button>
              </>
            ) : (
              <div className="compras-agotado">Agotado</div>
            )}
          </div>
        ))}
      </div>
      {/* FAB Carrito flotante */}
      <button className="carrito-fab" onClick={() => setMostrarCarrito(true)} title="Ver carrito">
        <i className="fa fa-shopping-cart"></i>
        {carrito.length > 0 && (
          <span className="carrito-fab-badge">{carrito.reduce((acc, p) => acc + p.cantidad, 0)}</span>
        )}
      </button>
      {mostrarCarrito && (
        <div className="carrito-modal-bg" onClick={() => setMostrarCarrito(false)}>
          <div className="carrito-modal" onClick={e => e.stopPropagation()}>
            <div className="carrito-header">
              <h2>🛒 Carrito de Compras</h2>
              <button className="carrito-close-btn" onClick={() => setMostrarCarrito(false)} title="Cerrar">✕</button>
            </div>
            <div className="carrito-divider"></div>
            {carrito.length === 0 ? (
              <div className="carrito-vacio">Tu carrito está vacío.<br/>¡Agrega productos para comenzar tu compra!</div>
            ) : (
              <table className="carrito-table animate-in">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id} className="carrito-row">
                      <td>{item.nombre}</td>
                      <td>Bs {item.precioVenta.toFixed(2)}</td>
                      <td>
                        <input type="number" min="1" max={item.stock} value={item.cantidad} style={{width:50}}
                          onChange={e => cambiarCantidad(item.id, Number(e.target.value))} className="carrito-cantidad-input" />
                      </td>
                      <td>Bs {(item.precioVenta * item.cantidad).toFixed(2)}</td>
                      <td>
                        <button onClick={() => quitarDelCarrito(item.id)} className="carrito-remove-btn" title="Quitar">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="carrito-divider"></div>
            <div className="carrito-total-row animate-in">
              <span>Total:</span>
              <span className="carrito-total">Bs {total.toFixed(2)}</span>
            </div>
            <div className="carrito-actions animate-in">
              <button className="compras-btn carrito-finalizar-btn" disabled={carrito.length === 0}>Finalizar compra</button>
              <button className="compras-btn carrito-cerrar-btn" style={{background:'#e5e7eb', color:'#222'}} onClick={() => setMostrarCarrito(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
      {/* Imagen zoom tipo modal */}
      {/* Eliminar funcionalidad de zoom modal al hacer click */}
    </div>
  );
}
