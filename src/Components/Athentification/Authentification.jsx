import React, { useState } from 'react';
import './Authentification.css'; // Créez ce fichier pour les styles personnalisés

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici la logique de soumission du formulaire
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm" style={{ width: '400px' }}>
        <div className="card-body">
          <ul className="nav nav-tabs" id="auth-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${isLogin ? 'active' : ''}`}
                id="login-tab"
                onClick={() => setIsLogin(true)}
              >
                Se connecter
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${!isLogin ? 'active' : ''}`}
                id="register-tab"
                onClick={() => setIsLogin(false)}
              >
                S'enregistrer
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3">
            <div className={`tab-pane fade ${isLogin ? 'show active' : ''}`} id="login">
              <h2 className="mb-4">Se connecter</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">Email</label>
                  <input type="email" id="login-email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">Mot de passe</label>
                  <input type="password" id="login-password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
              </form>
            </div>
            <div className={`tab-pane fade ${!isLogin ? 'show active' : ''}`} id="register">
              <h2 className="mb-4">S'enregistrer</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="register-name" className="form-label">Nom complet</label>
                  <input type="text" id="register-name" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">Email</label>
                  <input type="email" id="register-email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">Mot de passe</label>
                  <input type="password" id="register-password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">S'enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
