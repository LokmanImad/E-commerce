import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Coupon = () => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountAmount: '', expiryDate: '' });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch coupons from the backend
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coupon/');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
    fetchCoupons();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setNewCoupon({ code: '', discountAmount: '', expiryDate: '' });
  };
  
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/coupon/modi/${selectedCoupon._id}`, newCoupon);
        setCoupons(coupons.map(coupon =>
          coupon._id === selectedCoupon._id
            ? { ...selectedCoupon, ...newCoupon }
            : coupon
        ));
        setSelectedCoupon(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/coupon/create', newCoupon);
        setCoupons([...coupons, response.data.coupon]);
      }
      setNewCoupon({ code: '', discountAmount: '', expiryDate: '' });
      handleClose();
    } catch (error) {
      console.error('Error adding/updating coupon:', error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setNewCoupon({ 
      code: coupon.code, 
      discountAmount: coupon.discountAmount, 
      expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0] // Format date as YYYY-MM-DD
    });
    setEditMode(true);
    handleShow();
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/coupon/supr/${id}`);
      setCoupons(coupons.filter(coupon => coupon._id !== id));
      setShowToast(true);
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestion des Coupons</h2>

      {/* Bouton pour ajouter un coupon */}
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => { setEditMode(false); handleShow(); }}>
          Ajouter un Coupon
        </Button>
      </div>

      {/* Tableau des coupons */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Réduction</th>
            <th>Date d'expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon._id}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discountAmount}</td>
              <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditCoupon(coupon)} className="me-2">
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => handleDeleteCoupon(coupon._id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour créer ou modifier un coupon */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Modifier Coupon' : 'Créer un Nouveau Coupon'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCoupon}>
            <Form.Group className="mb-3" controlId="formCode">
              <Form.Label>Code de Coupon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le code"
                name="code"
                value={newCoupon.code}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Réduction (Montant)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer le montant de réduction"
                name="discountAmount"
                value={newCoupon.discountAmount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExpiration">
              <Form.Label>Date d'expiration</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={newCoupon.expiryDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editMode ? 'Modifier le Coupon' : 'Ajouter le Coupon'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Notification for Deletion */}
      <Toast
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Body>Coupon supprimé avec succès !</Toast.Body>
      </Toast>
    </div>
  );
};

export default Coupon;
