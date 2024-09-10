// src/components/Commandes.js
import React ,  { useState, useEffect } from 'react';
import axios from 'axios';
import './Commande.css'; // Assure-toi de créer ce fichier pour les styles


const Commande = () => {
    const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).id; // Récupérer l'ID de l'utilisateur depuis localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/commande/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="commandes-container">
      <h1>Mes Commandes</h1>
      <table className="commandes-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Produits</th>
            <th>Total</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
           {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{new Date(order.DateCommande).toLocaleDateString()}</td>
                <td>
                  {order.Produits.map(item => (
                    <div key={item.produit._id}>
                      {item.produit.nom} (x{item.quantite})
                    </div>
                  ))}
                </td>
                <td>{order.Etat}</td>
                <td>${order.Total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucune commande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Commande;
