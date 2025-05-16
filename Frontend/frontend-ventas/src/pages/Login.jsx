// Página de login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentes/Login.css';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/');
    }, 500); // Duración de la animación
  };

  return (
    <div className={`login-container${isLeaving ? ' login-leave' : ''}`}>
      <div className="login-illustration">
        <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/online-2023924_1280.png" alt="Farmacia Ilustración" />
      </div>
      <div className="login-form-section">
        <img className="login-logo" src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="logo" />
        <h1 className="login-title">FARMACIA<br/>BRITMANN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Usuario</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-user"></i></span>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="" />
          </div>
          <label className="login-label">Contraseña</label>
          <div className="login-input-group">
            <span className="login-icon"><i className="fa fa-lock"></i></span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="" />
          </div>
          <div className="login-links-row">
            <a href="#" className="login-link">Recuperar contraseña</a>
            <a href="#" className="login-link">Crear cuenta</a>
          </div>
          <button className="login-btn" type="submit">INICIAR SESIÓN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
