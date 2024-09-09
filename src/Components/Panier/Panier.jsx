import React, { useState, useEffect } from 'react';
import './main.css';
import Menu from '../Menu';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importer toast

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
//     const storedCart = localStorage.getItem('cart');
// console.log('Contenu du localStorage pour le panier :', storedCart);

    
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
                            <img src={item.image} alt={item.nom} />
                          </td>
                          <td className="product-name">{item.nom}</td>
                          <td className="product-price">${item.prix}</td>
                          <td className="product-quantity">
                            <input 
                              type="number" 
                              value={item.quantite} 
                              min="1" 
                              max={item.stock} 
                              onChange={(e) => updateQuantity(item._id, e.target.value)} 
                            />
                          </td>
                          <td className="product-total">${item.prix * item.quantite}</td>
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
                      <td>${calculateSubtotal()}</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Shipping: </strong></td>
                      <td>$45</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Total: </strong></td>
                      <td>${calculateTotal() + 45}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-buttons">
                  <a href="cart.html" className="boxed-btn">Update Cart</a>
                  <a href="checkout.html" className="boxed-btn black">Check Out</a>
                </div>
              </div>

              <div className="coupon-section">
                <h3>Apply Coupon</h3>
                <div className="coupon-form-wrap">
                  <form action="index.html">
                    <p><input type="text" placeholder="Coupon" /></p>
                    <p><input type="submit" value="Apply" /></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panier;
