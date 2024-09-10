import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Collapse, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Commande.css'; // Importer le fichier CSS pour le style personnalisé

const Commande = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [openUserId, setOpenUserId] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printData, setPrintData] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/commande/all'); // Adjust the API endpoint as needed
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/commande/modi/${orderId}`, { etat: newStatus });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, Etat: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const toggleUserDetails = (orderId) => {
    setOpenUserId(openUserId === orderId ? null : orderId);
  };

  const handlePrint = (order) => {
    setPrintData(order);
    setShowPrintModal(true);
  };

  const closePrintModal = () => {
    setShowPrintModal(false);
    setPrintData(null);
  };

  const printModalContent = () => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            @media print {
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; }
            }
          </style>
        </head>
        <body>
          ${document.querySelector('#print-content').innerHTML}
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
    closePrintModal();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestion des Commandes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Date</th>
            <th>Total</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.DateCommande).toLocaleDateString()}</td>
                <td>${order.Total}</td>
                <td>
                  <Form.Select
                    value={order.Etat}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    {openOrderId === order._id ? 'Masquer' : 'Voir'} Produits
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-2"
                    onClick={() => toggleUserDetails(order._id)}
                  >
                    {openUserId === order._id ? 'Masquer' : 'Voir'} Infos Utilisateur
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ml-2"
                    onClick={() => handlePrint(order)}
                  >
                    Imprimer
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <Collapse in={openOrderId === order._id}>
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Produit</th>
                            <th>Quantité</th>
                            <th>Prix Unitaire</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.Produits.map((product, index) => (
                            <tr key={index}>
                              <td>{product.produit.nom}</td>
                              <td>{product.quantite}</td>
                              <td>${product.produit.prix}</td>
                              <td>${product.quantite * product.produit.prix}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                  <Collapse in={openUserId === order._id}>
                    <div className="mt-3">
                      <h5>Informations Utilisateur</h5>
                      <p><strong>Nom:</strong> {order.user.name}</p>
                      <p><strong>Téléphone:</strong> {order.user.phone}</p>
                      <p><strong>Adresse:</strong> {order.user.address}</p>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Modal pour afficher les informations imprimables */}
      <Modal show={showPrintModal} onHide={closePrintModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informations de Commande</Modal.Title>
        </Modal.Header>
        <Modal.Body id="print-content">
          {printData && (
            <div>
              <h4>Informations Utilisateur</h4>
              <p><strong>Nom:</strong> {printData.user.name}</p>
              <p><strong>Téléphone:</strong> {printData.user.phone}</p>
              <p><strong>Adresse:</strong> {printData.user.address}</p>
              <h4 className="mt-4">Produits</h4>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printData.Produits.map((product, index) => (
                    <tr key={index}>
                      <td>{product.produit.nom}</td>
                      <td>{product.quantite}</td>
                      <td>${product.produit.prix}</td>
                      <td>${product.quantite * product.produit.prix}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePrintModal}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={printModalContent}
          >
            Imprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Commande;
