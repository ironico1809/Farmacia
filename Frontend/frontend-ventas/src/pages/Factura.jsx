import React, { useState } from 'react';
import Button from '../componentes/Button';
import '../componentes/Factura.css';

const Factura = ({ venta, cliente, onVolver }) => {
  const [tipo, setTipo] = useState('factura');
  const [mensaje, setMensaje] = useState(null);
  const [procesando, setProcesando] = useState(false);

  // Simulación de datos de venta y cliente si no se pasan como props
  const datosCliente = cliente || {
    ID: 1150,
    Nombre: 'Ana López',
    Telefono: '73501111',
    Email: 'ana.lopez@gmail.com'
  };
  const datosVenta = venta || {
    ID: 5001,
    Fecha: '2025-01-01',
    Hora: '09:15:00',
    Monto_Total: 150.00,
    Descuento: 0.00,
    UsuarioID: 1001,
    ClienteID: 1150,
    productos: [
      { id: 1745, nombre: 'PARACETAMOL', cantidad: 3, precio: 30.00 },
      { id: 4890, nombre: 'CLOFENAC', cantidad: 2, precio: 30.00 }
    ],
    total: 150.00,
    fecha: '2025-01-01 09:15:00'
  };

  // Validación defensiva para evitar pantalla en blanco
  const datosValidos = Array.isArray(datosVenta.productos) && typeof datosVenta.total !== 'undefined';

  // Mostrar siempre la UI aunque los datos estén vacíos
  // Solo mostrar mensaje de advertencia arriba de la factura si los datos están vacíos
  const advertencia = !datosValidos || datosVenta.productos.length === 0;

  const handleEmitir = () => {
    setMensaje(null);
    setProcesando(true);
    // Validación de datos mínimos
    if (!datosCliente.nombre || !datosCliente.documento) {
      setMensaje({ tipo: 'error', texto: 'Datos incompletos' });
      setProcesando(false);
      return;
    }
    // Simular proceso de emisión
    setTimeout(() => {
      if (Math.random() < 0.97) {
        setMensaje({ tipo: 'exito', texto: tipo === 'factura' ? 'Factura generada' : 'Recibo generado' });
      } else {
        setMensaje({ tipo: 'error', texto: 'Error al generar comprobante' });
      }
      setProcesando(false);
    }, 1200);
  };

  // Obtener la fecha y hora actual
  const fechaHoy = new Date().toISOString().slice(0, 10);
  const horaHoy = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="factura-container card-efecto" style={{maxWidth: 800, background: '#fff', padding: 0}}>
      <div style={{border: '1.5px solid #e0e7ef', borderRadius: '1.2rem', margin: 0, padding: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem 2.5rem 1.2rem 2.5rem', borderBottom: '1.5px solid #e5e7eb'}}>
          <div style={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
            <div style={{fontWeight: 700, fontSize: '1.2rem', color: '#2563eb'}}>FACTURA ELECTRÓNICA</div>
            <div style={{fontSize: '1.05rem', color: '#444'}}>Av. Central 456, Ciudad</div>
            <div style={{fontSize: '1.05rem', color: '#444'}}>Fecha: {fechaHoy}</div>
            <div style={{fontSize: '1.05rem', color: '#444'}}>Hora: {horaHoy}</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'flex-end'}}>
            <div style={{fontWeight: 800, fontSize: '1.5rem', color: '#222'}}>Farmacia Britmann</div>
          </div>
        </div>
        <div style={{padding: '1.2rem 2.5rem 0.5rem 2.5rem'}}>
          <div style={{fontSize: '1.08rem', marginBottom: '0.7rem'}}>
            <div><b>Cliente:</b> {datosCliente.Nombre}</div>
            <div><b>Teléfono:</b> {datosCliente.Telefono}</div>
            <div><b>Email:</b> {datosCliente.Email}</div>
          </div>
        </div>
        <div style={{padding: '0 2.5rem 1.5rem 2.5rem'}}>
          <table className="factura-table" style={{width: '100%', margin: 0}}>
            <thead>
              <tr>
                <th style={{width: '90px'}}>Código</th>
                <th>Descripción</th>
                <th style={{width: '90px'}}>Cantidad</th>
                <th style={{width: '120px'}}>Precio Unit.</th>
                <th style={{width: '120px'}}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datosVenta.productos) && datosVenta.productos.length > 0 ? (
                datosVenta.productos.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{`P${String(p.id).padStart(3, '0')}`}</td>
                    <td>{p.nombre}</td>
                    <td style={{textAlign:'center'}}>{p.cantidad}</td>
                    <td>${Number(p.precio).toFixed(2)}</td>
                    <td>${Number(p.precio * p.cantidad).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{textAlign:'center',color:'#aaa'}}>Sin productos</td></tr>
              )}
            </tbody>
          </table>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginTop:'1.2rem', fontSize:'1.08rem'}}>
            <div style={{marginBottom:'0.2rem'}}>Subtotal: <b>${Number(datosVenta.Monto_Total).toFixed(2)}</b></div>
            <div style={{marginBottom:'0.2rem'}}>Descuento: <b>${Number(datosVenta.Descuento).toFixed(2)}</b></div>
            <div style={{fontWeight:800, fontSize:'1.18rem', marginTop:'0.5rem'}}>TOTAL: <span style={{color:'#2563eb'}}>${(Number(datosVenta.Monto_Total) - Number(datosVenta.Descuento)).toFixed(2)}</span></div>
          </div>
        </div>
        <div style={{padding:'1.2rem 2.5rem 2rem 2.5rem', display:'flex', justifyContent:'flex-end', gap:'1.2rem'}}>
          <Button className="factura-btn" onClick={onVolver} disabled={procesando}>Volver</Button>
          <Button className="factura-btn emitir" onClick={handleEmitir} disabled={procesando}>
            {procesando ? 'Procesando...' : 'Emitir Comprobante'}
          </Button>
        </div>
        {mensaje && (
          <div className={`factura-alert factura-alert-${mensaje.tipo}`} style={{margin:'0 2.5rem 1.2rem 2.5rem'}}>{mensaje.texto}</div>
        )}
      </div>
    </div>
  );
};

export default Factura;
