import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../componentes/Button';
import '../componentes/RegistroDeUsuario.css';
import '../componentes/Login.css'; // Para reutilizar los estilos de input y animaciones

const initialState = {
  personal: {
    CI: '',
    Nombre: '',
    Sexo: '',
    Telefono: '',
    Correo: '',
    Domicilio: '',
  },
  usuario: {
    Usuario: '',
    Contraseña: '',
    RolID: '',
  },
};

const rolesMock = [
  { id: 110, nombre: 'Administrador' },
  { id: 220, nombre: 'Farmacéutico' },
  { id: 330, nombre: 'Cajero' },
  { id: 440, nombre: 'Almacenero' },
  { id: 550, nombre: 'Supervisor' },
];

const RegistroDeUsuario = () => {
  const [form, setForm] = useState(initialState);
  const [alerta, setAlerta] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerta('Usuario registrado correctamente');
    setTimeout(() => setAlerta(null), 1000);
    setForm(initialState);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleIrLogin = (e) => {
    e.preventDefault();
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  return (
    <div className={`login-container${isLeaving ? ' login-leave' : ''}`}> 
      <div className="login-form-section" style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1 className="login-title" style={{marginBottom: '1.5rem'}}>Registro de Usuario</h1>
         <form className="login-form" onSubmit={handleSubmit} style={{maxWidth: 400, width: '100%'}}>
          <label className="login-label">CI</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-id-card"></i></span>
            <input className="login-input" type="text" name="CI" value={form.personal.CI} onChange={e => handleChange(e, 'personal')} required />
          </div>
          <label className="login-label">Nombre completo</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-user"></i></span>
            <input className="login-input" type="text" name="Nombre" value={form.personal.Nombre} onChange={e => handleChange(e, 'personal')} required />
          </div>
          <label className="login-label">Sexo</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-venus-mars"></i></span>
            <select className="login-select login-input" name="Sexo" value={form.personal.Sexo} onChange={e => handleChange(e, 'personal')} required style={{flex: 1, background: 'transparent', border: 'none', fontSize: '1.1rem', color: '#444a53'}}>
              <option value="" disabled hidden>Sexo</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>
          <label className="login-label">Teléfono</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-phone"></i></span>
            <input className="login-input" type="text" name="Telefono" value={form.personal.Telefono} onChange={e => handleChange(e, 'personal')} required />
          </div>
          <label className="login-label">Correo electrónico</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-envelope"></i></span>
            <input className="login-input" type="email" name="Correo" value={form.personal.Correo} onChange={e => handleChange(e, 'personal')} required />
          </div>
          <label className="login-label">Domicilio</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-home"></i></span>
            <input className="login-input" type="text" name="Domicilio" value={form.personal.Domicilio} onChange={e => handleChange(e, 'personal')} required />
          </div>
          <label className="login-label">Nombre de usuario</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-user-circle"></i></span>
            <input className="login-input" type="text" name="Usuario" value={form.usuario.Usuario} onChange={e => handleChange(e, 'usuario')} required />
          </div>
          <label className="login-label">Contraseña</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-lock"></i></span>
            <input className="login-input" type="password" name="Contraseña" value={form.usuario.Contraseña} onChange={e => handleChange(e, 'usuario')} required />
          </div>
          <label className="login-label">Rol</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-users-cog"></i></span>
            <select className="login-input" name="RolID" value={form.usuario.RolID} onChange={e => handleChange(e, 'usuario')} required style={{flex: 1, background: 'transparent', border: 'none', fontSize: '1.1rem', color: '#444a53'}}>
              <option value="" disabled hidden>Rol</option>
              {rolesMock.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div style={{marginTop: '1.2rem'}}>
            <Button className="login-btn" type="submit" style={{width: '100%'}}>Registrar</Button>
          </div>
          {alerta && <div className="registro-usuario-alert" style={{marginTop: '1rem'}}>{alerta}</div>}
        </form>
        <div className="login-links-row" style={{marginTop: '1.2rem', justifyContent: 'center'}}>
          <a href="#" className="login-link" onClick={handleIrLogin}>¿Ya tienes una cuenta? Iniciar sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegistroDeUsuario;
