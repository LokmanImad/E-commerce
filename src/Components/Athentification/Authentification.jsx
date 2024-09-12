import React, { useState } from 'react';
import axios from 'axios';
import './Authentification.css';
import { useNavigate } from 'react-router-dom';

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Utilisé pour rediriger après la connexion

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

  // Fonction pour réinitialiser les champs de formulaire
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isLogin ? '/login' : '/register';
      console.log('Envoi des données à :', `http://localhost:5000/api/users${url}`);
      console.log('FormData:', formData);

      const response = await axios.post(`http://localhost:5000/api/users${url}`, formData);
      console.log('Réponse de l\'API:', response);

      if (response.status === 201 || response.status === 200) {
        if (isLogin) {
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Redirection en fonction du rôle de l'utilisateur
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'client') {
            navigate('/client');
          } else {
            navigate('/'); // Redirection par défaut si le rôle est inconnu
          }
        } else {
          setMessage('Inscription réussie, veuillez vous connecter.');
          setIsLogin(true);
        }
        resetForm();
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error.response?.data || error.message);
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
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input 
                      type="password" 
                      id="password" 
                      className="form-control" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
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
                    <input 
                      type="text" 
                      id="name" 
                      className="form-control" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input 
                      type="password" 
                      id="password" 
                      className="form-control" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
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
