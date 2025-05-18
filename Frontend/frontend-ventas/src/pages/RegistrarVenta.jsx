import Button from "../componentes/Button";
import { useState, useEffect } from "react";
import "../componentes/RegistrarVenta.css";
import Factura from './Factura';

const RegistrarVenta = () => {
  const [cliente, setCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoActual, setProductoActual] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [requiereFactura, setRequiereFactura] = useState(false);
  const [tieneReceta, setTieneReceta] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [ventaGenerada, setVentaGenerada] = useState(null);
  const [clienteGenerado, setClienteGenerado] = useState(null);

  useEffect(() => {
    setClientes([
      { id: 1, nombre: "Juan Pérez", documento: "12345678", telefono: "(011) 4567-8901" },
      { id: 2, nombre: "María López", documento: "87654321", telefono: "(011) 1234-5678" },
      { id: 3, nombre: "Carlos Rodríguez", documento: "23456789", telefono: "(011) 9876-5432" },
    ]);
    setProductos([
      { id: 1, nombre: "Paracetamol 500mg", precio: 10.5, stock: 100 },
      { id: 2, nombre: "Ibuprofeno 400mg", precio: 15.75, stock: 80 },
      { id: 3, nombre: "Amoxicilina 500mg", precio: 25.2, stock: 50 },
      { id: 4, nombre: "Loratadina 10mg", precio: 12.3, stock: 120 },
      { id: 5, nombre: "Omeprazol 20mg", precio: 18.9, stock: 65 },
    ]);
  }, []);

  const handleAddProducto = () => {
    if (!productoActual) {
      mostrarAlerta("Debe seleccionar un producto", "warning");
      return;
    }
    const productoSeleccionado = productos.find((p) => p.id === parseInt(productoActual));
    if (!productoSeleccionado) return;
    if (productoSeleccionado.stock < cantidad) {
      mostrarAlerta(`Stock insuficiente. Disponible: ${productoSeleccionado.stock}`, "error");
      return;
    }
    const productoExistente = productosSeleccionados.find((p) => p.id === productoSeleccionado.id);
    if (productoExistente) {
      if (productoExistente.cantidad + cantidad > productoSeleccionado.stock) {
        mostrarAlerta(`Stock insuficiente para añadir ${cantidad} unidades más`, "error");
        return;
      }
      const nuevosProductos = productosSeleccionados.map((p) =>
        p.id === productoSeleccionado.id
          ? { ...p, cantidad: p.cantidad + cantidad, subtotal: (p.cantidad + cantidad) * p.precio }
          : p
      );
      setProductosSeleccionados(nuevosProductos);
    } else {
      setProductosSeleccionados([
        ...productosSeleccionados,
        {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidad: cantidad,
          subtotal: productoSeleccionado.precio * cantidad,
        },
      ]);
    }
    setProductoActual("");
    setCantidad(1);
    mostrarAlerta("Producto añadido correctamente", "success");
  };

  const handleRemoveProducto = (id) => {
    setProductosSeleccionados(productosSeleccionados.filter((p) => p.id !== id));
    mostrarAlerta("Producto eliminado", "info");
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlertMessage(mensaje);
    setAlertType(tipo);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleSubmit = () => {
    if (!cliente) {
      mostrarAlerta("Debe seleccionar un cliente", "warning");
      return;
    }
    if (productosSeleccionados.length === 0) {
      mostrarAlerta("Debe agregar al menos un producto", "warning");
      return;
    }
    // Buscar cliente por nombre o documento (más robusto)
    let clienteObj = clientes.find(c =>
      cliente === `${c.nombre} - ${c.documento}` ||
      cliente === c.nombre ||
      cliente === c.documento ||
      c.nombre.toLowerCase().includes(cliente.toLowerCase()) ||
      c.documento.includes(cliente)
    );
    if (!clienteObj) {
      // Si no se encuentra, crear uno básico para evitar pantalla en blanco
      clienteObj = { nombre: cliente, documento: '', telefono: '', direccion: '' };
    }
    setVentaGenerada({ productos: productosSeleccionados, total: calcularTotal(), fecha: new Date().toLocaleString() });
    setClienteGenerado(clienteObj);
    setMostrarFactura(true);
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((total, p) => total + p.subtotal, 0).toFixed(2);
  };

  if (mostrarFactura) {
    return <Factura venta={ventaGenerada} cliente={clienteGenerado} onVolver={() => setMostrarFactura(false)} />;
  }

  return (
    <div className="venta-container venta-container-encuadre">
      <h2 className="venta-title">REGISTRO DE VENTA</h2>
      {/* Información del Cliente */}
      <div className="venta-card venta-card-cliente">
        <div className="venta-card-header">Información del Cliente</div>
        <div className="venta-card-body venta-cliente-row">
          <input
            className="venta-input"
            placeholder="Buscar por nombre o DNI..."
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            list="clientes-list"
          />
          <datalist id="clientes-list">
            {clientes.filter(c =>
              c.nombre.toLowerCase().includes(cliente.toLowerCase()) ||
              c.documento.includes(cliente)
            ).map(c => (
              <option key={c.id} value={`${c.nombre} - ${c.documento}`} />
            ))}
          </datalist>
          <input
            className="venta-input"
            placeholder="DNI"
            value={(function() {
              const c = clientes.find(c =>
                cliente === `${c.nombre} - ${c.documento}` ||
                cliente === c.nombre ||
                cliente === c.documento
              );
              return c ? c.documento : "";
            })()}
            disabled
          />
          <input
            className="venta-input"
            placeholder="Tel: (011) 4567-8901"
            value={(function() {
              const c = clientes.find(c =>
                cliente === `${c.nombre} - ${c.documento}` ||
                cliente === c.nombre ||
                cliente === c.documento
              );
              return c ? c.telefono || "" : "";
            })()}
            disabled
          />
        </div>
      </div>
      {/* Productos */}
      <div className="venta-card venta-card-productos">
        <div className="venta-card-header">Productos</div>
        <div className="venta-card-body">
          <div className="venta-producto-row">
            <select
              className="venta-input"
              value={productoActual}
              onChange={e => setProductoActual(e.target.value)}
            >
              <option value="">Seleccionar producto...</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} (Stock: {p.stock})
                </option>
              ))}
            </select>
            <input
              className="venta-input"
              type="number"
              min="1"
              max={
                productoActual
                  ? productos.find((p) => p.id === parseInt(productoActual))?.stock || 1
                  : 1
              }
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
              style={{ width: "80px", marginLeft: "8px" }}
              placeholder="Cantidad"
            />
            <Button className="venta-btn venta-btn-agregar" onClick={handleAddProducto}>Agregar Producto</Button>
          </div>
          <div className="venta-table-wrapper">
            <table className="venta-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  productosSeleccionados.length === 0
                    ? [
                        <tr key="empty">
                          <td colSpan="6" className="venta-table-empty">No hay productos seleccionados</td>
                        </tr>
                      ]
                    : productosSeleccionados.map((p, idx) => (
                        <tr key={p.id}>
                          <td>{`P00${idx + 1}`}</td>
                          <td>{p.nombre}</td>
                          <td>{p.cantidad}</td>
                          <td>${p.precio.toLocaleString()}</td>
                          <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                          <td>
                            <Button className="venta-btn venta-btn-eliminar" onClick={() => handleRemoveProducto(p.id)}>X</Button>
                          </td>
                        </tr>
                      ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pago */}
      <div className="venta-card venta-card-pago">
        <div className="venta-card-header">Pago</div>
        <div className="venta-card-body venta-pago-row">
          <div className="venta-pago-metodo">
            <label className="venta-pago-label">Método de Pago:</label>
            <div className="venta-metodo-group">
              <label className={`venta-metodo-radio${metodoPago === 'efectivo' ? ' selected' : ''}`}> 
                <input type="radio" name="metodoPago" value="efectivo" checked={metodoPago === 'efectivo'} onChange={e => setMetodoPago(e.target.value)} />
                <span className="icon"><i className="fa fa-money-bill-wave"></i></span>
                Efectivo
              </label>
              <label className={`venta-metodo-radio${metodoPago === 'tarjeta' ? ' selected' : ''}`}> 
                <input type="radio" name="metodoPago" value="tarjeta" checked={metodoPago === 'tarjeta'} onChange={e => setMetodoPago(e.target.value)} />
                <span className="icon"><i className="fa fa-credit-card"></i></span>
                Tarjeta
              </label>
              <label className={`venta-metodo-radio${metodoPago === 'transferencia' ? ' selected' : ''}`}> 
                <input type="radio" name="metodoPago" value="transferencia" checked={metodoPago === 'transferencia'} onChange={e => setMetodoPago(e.target.value)} />
                <span className="icon"><i className="fa fa-university"></i></span>
                Transferencia
              </label>
            </div>
          </div>
          <div className="venta-pago-resumen">
            <div className="venta-pago-item">Subtotal: <span>${calcularTotal()}</span></div>
            <div className="venta-pago-total">TOTAL: <span>${calcularTotal()}</span></div>
          </div>
        </div>
      </div>
      {/* Botones */}
      <div className="venta-btns-row">
        <Button className="venta-btn venta-btn-cancelar" onClick={() => {
          setCliente("");
          setProductosSeleccionados([]);
          setProductoActual("");
          setCantidad(1);
          setMetodoPago("efectivo");
          setRequiereFactura(false);
          setTieneReceta(false);
        }}>Cancelar Venta</Button>
        <Button className="venta-btn venta-btn-registrar" onClick={handleSubmit} disabled={productosSeleccionados.length === 0 || !cliente}>Registrar Venta</Button>
      </div>
    </div>
  );
};

export default RegistrarVenta;