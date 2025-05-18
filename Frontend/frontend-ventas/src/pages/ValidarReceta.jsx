import React, { useState } from 'react';
import '../componentes/ValidarReceta.css';

const recetasEjemplo = [
  {
    codigo: 'REC-2580',
    fechaEmision: '2025-05-10',
    fechaVencimiento: '2025-06-10',
    cliente: 'Carlos Rodriguez',
    ci: '45632178',
    estado: 'pendiente',
    medicamentos: [
      { nombre: 'Alprazolam 0.5mg', dosis: '1 tableta cada 12 horas', cantidad: '30 tabletas', tipo: 'Controlado' },
      { nombre: 'Omeprazol 20mg', dosis: '1 cápsula en ayunas', cantidad: '30 cápsulas', tipo: 'Normal' },
    ],
    validada: false,
  },
  // Puedes agregar más recetas de ejemplo aquí
];

function ValidarReceta() {
  const [codigo, setCodigo] = useState('');
  const [receta, setReceta] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [resultado, setResultado] = useState('');
  const [autorizada, setAutorizada] = useState(false);

  const buscarReceta = () => {
    setMensaje('');
    setAutorizada(false);
    const encontrada = recetasEjemplo.find(r => r.codigo === codigo);
    if (!encontrada) {
      setReceta(null);
      setMensaje('Receta no encontrada');
      return;
    }
    // Validar vencimiento
    const hoy = new Date().toISOString().slice(0, 10);
    if (encontrada.fechaVencimiento < hoy) {
      setReceta(null);
      setMensaje('Receta inválida (vencida)');
      return;
    }
    // Validar si ya fue validada
    if (encontrada.validada) {
      setReceta(null);
      setMensaje('Receta ya registrada');
      return;
    }
    setReceta(encontrada);
    setMensaje('Receta encontrada. Puede proceder a validar.');
  };

  const autorizarVenta = () => {
    setAutorizada(true);
    setMensaje('¡Receta aprobada y validada! Puede autorizar la venta.');
  };

  return (
    <div className="validar-receta-container">
      <h2>Validar Receta Médica para Medicamentos Controlados</h2>
      <div className="alerta-proceso">
        Antes de autorizar la venta de medicamentos controlados, valide la receta médica presentada por el cliente.
      </div>
      <div className="card-validar">
        <div className="form-row">
          <div className="form-group">
            <label>Código de Receta</label>
            <input type="text" className="form-control" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ingrese el código de receta" />
          </div>
          <div className="form-group" style={{alignSelf: 'flex-end'}}>
            <button className="btn btn-primary" type="button" onClick={buscarReceta}>Validar Receta</button>
          </div>
        </div>
        {mensaje && <div className="mensaje-validacion">{mensaje}</div>}
        {receta && (
          <div className="datos-receta">
            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Emisión</label>
                <input type="date" className="form-control" value={receta.fechaEmision} readOnly />
              </div>
              <div className="form-group">
                <label>Fecha de Vencimiento</label>
                <input type="date" className="form-control" value={receta.fechaVencimiento} readOnly />
              </div>
              <div className="form-group">
                <label>Cliente</label>
                <input type="text" className="form-control" value={receta.cliente} readOnly />
              </div>
              <div className="form-group">
                <label>CI Cliente</label>
                <input type="text" className="form-control" value={receta.ci} readOnly />
              </div>
            </div>
            <div className="medicamentos-section">
              <h4>Medicamentos Prescritos</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Dosis</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {receta.medicamentos.map((m, idx) => (
                    <tr key={idx} className={m.tipo === 'Controlado' ? 'controlled' : ''}>
                      <td>{m.nombre}</td>
                      <td>{m.dosis}</td>
                      <td>{m.cantidad}</td>
                      <td>{m.tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="validation-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Resultado de Verificación</label>
                  <select className="form-control" value={resultado} onChange={e => setResultado(e.target.value)}>
                    <option value="">Seleccione...</option>
                    <option value="autentica">Receta Auténtica</option>
                    <option value="sospechosa">Receta Sospechosa</option>
                    <option value="falsificada">Receta Falsificada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Farmacéutico Responsable</label>
                  <input type="text" className="form-control" value="Nirvana Arias" readOnly />
                </div>
              </div>
              <div className="validation-field">
                <label>Observaciones</label>
                <textarea className="form-control" rows="3" value={observaciones} onChange={e => setObservaciones(e.target.value)} placeholder="Ingrese sus observaciones sobre la validación..."></textarea>
              </div>
              <div className="action-buttons">
                <button className="btn btn-danger" type="button" onClick={()=>setMensaje('Receta rechazada')}>Rechazar</button>
                <button className="btn btn-warning" type="button" onClick={()=>setMensaje('Receta pendiente de validación')}>Pendiente</button>
                <button className="btn btn-success" type="button" onClick={autorizarVenta} disabled={autorizada}>Aprobar</button>
                <button className="btn btn-primary" type="button" onClick={()=>setMensaje('Validación guardada')}>Guardar Validación</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ValidarReceta;
