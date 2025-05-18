import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../componentes/Button';
import '../componentes/OlvideContrasena.css';

const OlvideContrasena = () => {
  const [input, setInput] = useState('');
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3500);
  };

  return (
    <div className={`login-container`}>
      <div className="login-form-section" style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1 className="login-title" style={{marginBottom: '1.5rem'}}>FARMACIA BRITMANN</h1>
        <div className="olvide-card">
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <div style={{textAlign: 'center', marginBottom: '1.2rem'}}>
              <i className="fa fa-lock olvide-icon"></i>
              <div className="olvide-card-title">¿Tienes problemas para iniciar sesión?</div>
              <div className="olvide-card-desc">Ingresa tu correo electrónico, teléfono o nombre de usuario y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</div>
            </div>
            <input
              className="olvide-input login-input"
              type="text"
              placeholder="Correo electrónico, teléfono o usuario"
              value={input}
              onChange={e => setInput(e.target.value)}
              required
            />
            <Button className="olvide-btn login-btn" type="submit">
              Enviar enlace de recuperación
            </Button>
            {enviado && <div className="olvide-alert registro-usuario-alert">Enlace enviado (simulado)</div>}
            <div className="login-links-row" style={{marginTop: '1.2rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <a href="#" className="login-link" onClick={e => {e.preventDefault(); navigate('/login')}}>Volver al inicio de sesión</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OlvideContrasena;
