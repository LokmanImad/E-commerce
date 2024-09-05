import React, { useState } from 'react';
import axios from 'axios'; // Si vous utilisez axios pour les requêtes HTTP
import './Authentification.css';

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMessage(''); // Réinitialiser le message lors du changement de tab
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isLogin ? '/login' : '/register';
      const response = await axios.post(`http://localhost:5000/api/users${url}`, formData);

      if (response.status === 201 || response.status === 200) {
        setMessage(isLogin ? 'Connexion réussie' : 'Inscription réussie');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la requête');
    }
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
                onClick={handleToggle}
              >
                Se connecter
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${!isLogin ? 'active' : ''}`}
                id="register-tab"
                onClick={handleToggle}
              >
                S'enregistrer
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3">
            {message && <div className="alert alert-info">{message}</div>}
            {isLogin ? (
              <div className="tab-pane show active" id="login">
                <h2 className="mb-4">Se connecter</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" id="password" className="form-control" onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
              </div>
            ) : (
              <div className="tab-pane show active" id="register">
                <h2 className="mb-4">S'enregistrer</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom complet</label>
                    <input type="text" id="name" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" id="password" className="form-control" onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">S'enregistrer</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
