import React, { useState, useEffect } from 'react';
import './main.css';
import Menu from '../Menu';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importer toast
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userphone , setuserphone] = useState('');
  const [useradresse , setuseradresse] = useState('');
  const [checkoutData, setCheckoutData] = useState({ 
     nom: '',
    email: '',
    address: '',
    telephone: '',
    message: ''
  });

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCartItems();
   
    const userData = JSON.parse(localStorage.getItem('user')) || {};

    if (!userData.id) {
      navigate('/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }
    
    const userphone = JSON.parse(localStorage.getItem('user')).phone;
    setuserphone(userphone);
    const useradress = JSON.parse(localStorage.getItem('user')).address;
    setuseradresse(useradress);
    

    setCheckoutData(prevData => ({
      ...prevData,
      nom: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
      phone: userData.phone || ''
    }));
  }, []);

    const fetchCartItems = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIds = storedCart.map(item => item.produitId);
    
        console.log('IDs des produits dans le panier :', productIds);
    
        if (productIds.length > 0) {
          const validProductIds = productIds.filter(id => id.length === 24);
    
          if (validProductIds.length > 0) {
            console.log('IDs valides envoyés à l\'API :', validProductIds);
    
            const response = await axios.get('http://localhost:5000/api/produit/par-ids', {
              params: { ids: validProductIds.join(',') }
            });
    
            console.log('Données reçues de l\'API :', response.data);
    
            const cartDetails = response.data.map(product => {
              const item = storedCart.find(cartItem => cartItem.produitId === product._id);
              return { ...product, quantite: item ? item.quantite : 0 };
            });
    
            setCartItems(cartDetails);
          } else {
            console.warn('Aucun ID de produit valide trouvé dans le panier.');
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des éléments du panier :', error);
      }
    };
    
    
// Fonction pour gérer l'application du coupon
const handleApplyCoupon = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/coupon/apply', { code: couponCode });

    if (response.data.valid) {
      setDiscount(response.data.discount); // Appliquez la réduction si le coupon est valide
      toast.success('Coupon appliqué avec succès !');
    } else {
      toast.error('Coupon invalide.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'application du coupon :', error);
    toast.error('Erreur lors de l\'application du coupon.');
  }
};

const calculateTotalWithDiscount = () => {
  const subtotal = calculateSubtotal();
  const shipping = 50; // Coût fixe de livraison
  return (subtotal + shipping) * (1 - discount / 100);
};

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prix * item.quantite, 0);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.prix * item.quantite, 0);
  };

  const removeFromCart = (itemId) => {
    try {
      const updatedCart = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart.map(item => ({ produitId: item._id, quantite: item.quantite }))));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    try {
      const updatedCart = cartItems.map(item =>
        item._id === itemId ? { ...item, quantite: Number(quantity) } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart.map(item => ({ produitId: item._id, quantite: item.quantite }))));
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const userphone = JSON.parse(localStorage.getItem('user')).phone;
    setuserphone(userphone);
    const useradress = JSON.parse(localStorage.getItem('user')).address;
  
    const orderData = {
      produits: cartItems.map(item => ({
        produit: item._id,
        quantite: item.quantite
      })),
      total: calculateTotalWithDiscount(),
      etat: 'En attente',
      userId: userId,
      adresse: checkoutData.address || useradress, // Inclure l'adresse
      telephone: checkoutData.telephone ||userphone // Inclure le téléphone
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/commande/create', orderData);
      localStorage.removeItem('cart');
      setCartItems([]);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Commande soumise avec succès !');
      setShowCheckoutForm(false);
    } catch (error) {
      console.error('Erreur lors de la soumission de la commande :', error);
      toast.error('Erreur lors de la soumission de la commande.');
    }
  };

  return (
    <>
      <Menu />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th className="product-remove"></th>
                      <th className="product-image">Product Image</th>
                      <th className="product-name">Name</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item._id} className="table-body-row">
                          <td className="product-remove">
                            <a href="#" onClick={() => removeFromCart(item._id)}><i className="far fa-window-close"></i></a>
                          </td>
                          <td className="product-image">
                            <img src={`src/img/Produit/${item.images[0]}`} alt={item.nom} />
                          </td>
                          <td className="product-name">{item.nom}</td>
                          <td className="product-price">{item.prix} DH</td>
                          <td className="product-quantity">
                            <input 
                              type="number" 
                              value={item.quantite} 
                              min="1" 
                              max={item.stock} 
                              onChange={(e) => updateQuantity(item._id, e.target.value)} 
                            />
                          </td>
                          <td className="product-total">{item.prix * item.quantite} DH</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Votre panier est vide.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="total-section">
                <table className="total-table">
                  <thead className="total-table-head">
                    <tr className="table-total-row">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="total-data">
                      <td><strong>Subtotal: </strong></td>
                      <td>{calculateSubtotal()} DH</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Shipping: </strong></td>
                      <td>50 DH</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Discount: </strong></td>
                      <td>{discount} %</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Total: </strong></td>
                      <td>{calculateTotalWithDiscount()} DH</td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-buttons">
                  <a href="cart.html" className="boxed-btn">Update Cart</a>
                  <button onClick={handleCheckoutClick} className="cart-btn">Check Out</button>
                </div>
              </div>

              <div className="coupon-section">
    <h3>Apply Coupon</h3>
    <div className="coupon-form-wrap">
      <form onSubmit={handleApplyCoupon}>
        <p>
          <input 
            type="text" 
            placeholder="Coupon" 
            value={couponCode} 
            onChange={(e) => setCouponCode(e.target.value)} 
          />
        </p>
        <p><input type="submit" value="Apply" /></p>
      </form>
    </div>
  </div>
              
            </div>
            
      {/* Modal for Checkout */}
      {showCheckoutForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Checkout</h2>
              <button type="button" className="close" onClick={() => setShowCheckoutForm(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="nom">Name</label>
                  <input 
                    type="text" 
                    id="nom" 
                    name="nom" 
                    value={checkoutData.nom} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={checkoutData.email} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="adresse" 
                    name="adresse" 
                    value={checkoutData.address || useradresse } 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Phone</label>
                  <input 
                    type="tel" 
                    id="telephone" 
                    name="telephone" 
                    value={  checkoutData.phone || userphone} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={checkoutData.message} 
                    onChange={handleInputChange} 
                    className="form-control" 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowCheckoutForm(false)}>Close</button>
            </div>
          </div>
        </div>
      )}


      <style jsx>{`
         .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          width: 100%;
          padding: 20px;
          position: relative;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .close {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .modal-body {
          padding: 10px 0;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-control {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }
        .btn-secondary {
          background-color: #6c757d;
          border-color: #6c757d;
        }
      `}</style>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Panier;
