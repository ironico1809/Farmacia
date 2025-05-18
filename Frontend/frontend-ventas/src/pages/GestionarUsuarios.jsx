import React, { useState, useEffect } from 'react';
import Button from '../componentes/Button';
import '../componentes/GestionarUsuarios.css';

const mockUsuarios = [
  { id: 1, nombre: 'Ana Torres', usuario: 'atorres', rol: 'Administrador', telefono: '78945612', correo: 'ana@farmacia.com', activo: true },
  { id: 2, nombre: 'Luis Pérez', usuario: 'lperez', rol: 'Personal', telefono: '65412378', correo: 'luis@farmacia.com', activo: true },
  { id: 3, nombre: 'Marta Díaz', usuario: 'mdiaz', rol: 'Personal', telefono: '98765432', correo: 'marta@farmacia.com', activo: false },
];

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState(null); // null | 'nuevo' | usuario a editar
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleBuscar = (e) => setBusqueda(e.target.value);

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.rol.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleNuevo = () => {
    setUsuarioEdit({ nombre: '', usuario: '', rol: '', telefono: '', correo: '', activo: true });
    setModal('nuevo');
  };

  const handleEditar = (usuario) => {
    setUsuarioEdit({ ...usuario });
    setModal('editar');
  };

  const handleEliminar = (usuario) => {
    setUsuarioEdit({ ...usuario });
    setModal('eliminar');
  };

  const handleGuardar = () => {
    if (!usuarioEdit.nombre || !usuarioEdit.usuario || !usuarioEdit.rol) {
      setMensaje({ tipo: 'error', texto: 'Error los datos no son válidos' });
      return;
    }
    if (modal === 'nuevo') {
      if (usuarios.some(u => u.usuario === usuarioEdit.usuario)) {
        setMensaje({ tipo: 'error', texto: 'El Empleado ya fue registrado' });
        return;
      }
      setUsuarios([...usuarios, { ...usuarioEdit, id: usuarios.length + 1 }]);
      setMensaje({ tipo: 'exito', texto: 'Datos registrados' });
    } else if (modal === 'editar') {
      setUsuarios(usuarios.map(u => u.id === usuarioEdit.id ? usuarioEdit : u));
      setMensaje({ tipo: 'exito', texto: 'Modificación Correcta' });
    }
    setModal(null);
  };

  const handleConfirmarEliminar = () => {
    setUsuarios(usuarios.filter(u => u.id !== usuarioEdit.id));
    setMensaje({ tipo: 'exito', texto: 'Datos Eliminado' });
    setModal(null);
  };

  // Ocultar mensaje automáticamente después de 2.5 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <div className="gestionar-usuarios-container card-efecto">
      <h2 className="gestionar-usuarios-title">Gestionar Usuarios</h2>
      <div className="gestionar-usuarios-bar">
        <input
          className="gestionar-usuarios-input"
          type="text"
          placeholder="Buscar por nombre, usuario o rol..."
          value={busqueda}
          onChange={handleBuscar}
        />
      </div>
      {mensaje && (
        <div className={`gu-alert gu-alert-${mensaje.tipo} fade-in`}>{mensaje.texto}</div>
      )}
      <div className="gestionar-usuarios-table-wrapper">
        <table className="gestionar-usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr><td colSpan="8" className="gu-empty">No se encontraron usuarios</td></tr>
            ) : (
              usuariosFiltrados.map(usuario => (
                <tr key={usuario.id} className={!usuario.activo ? 'gu-inactivo' : ''}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.usuario}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.activo ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button className="gestionar-usuarios-btn editar" onClick={() => handleEditar(usuario)} title="Editar">
                      <i className="fa fa-pen fa-xs"></i>
                    </Button>
                    <Button className="gestionar-usuarios-btn eliminar" onClick={() => handleEliminar(usuario)} title="Eliminar">
                      <i className="fa fa-trash fa-xs"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modal && (
        <div className="gu-modal-bg">
          <div className="gu-modal">
            {modal === 'eliminar' ? (
              <>
                <h3>¿Eliminar usuario?</h3>
                <p>¿Está seguro que desea eliminar a <b>{usuarioEdit.nombre}</b>?</p>
                <Button className="gestionar-usuarios-btn cancelar" onClick={() => setModal(null)}>Cancelar</Button>
                <Button className="gestionar-usuarios-btn eliminar" onClick={handleConfirmarEliminar}>Eliminar</Button>
              </>
            ) : (
              <>
                <h3>{modal === 'nuevo' ? 'Registrar Usuario' : 'Editar Usuario'}</h3>
                <form className="gu-form" onSubmit={e => { e.preventDefault(); handleGuardar(); }}>
                  <input className="gu-input" type="text" placeholder="Nombre" value={usuarioEdit.nombre} onChange={e => setUsuarioEdit({ ...usuarioEdit, nombre: e.target.value })} required />
                  <input className="gu-input" type="text" placeholder="Usuario" value={usuarioEdit.usuario} onChange={e => setUsuarioEdit({ ...usuarioEdit, usuario: e.target.value })} required />
                  <select className="gu-input" value={usuarioEdit.rol} onChange={e => setUsuarioEdit({ ...usuarioEdit, rol: e.target.value })} required>
                    <option value="">Seleccionar rol...</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Personal">Personal</option>
                  </select>
                  <input className="gu-input" type="text" placeholder="Teléfono" value={usuarioEdit.telefono} onChange={e => setUsuarioEdit({ ...usuarioEdit, telefono: e.target.value })} />
                  <input className="gu-input" type="email" placeholder="Correo" value={usuarioEdit.correo} onChange={e => setUsuarioEdit({ ...usuarioEdit, correo: e.target.value })} />
                  <div className="gu-form-actions">
                    <Button className="gestionar-usuarios-btn cancelar" type="button" onClick={() => setModal(null)}>Cancelar</Button>
                    <Button className="gestionar-usuarios-btn guardar" type="submit">Guardar</Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarUsuarios;
