import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Menu';
import Carousel from '../Carousel';
import { toast } from 'react-toastify'; // Importer toast

const Details = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate(); // To navigate to other routes
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product details by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/produit/productDetails/${id}`);
        setProduct(response.data);

        // Fetch related products based on the category or some criteria
        const relatedResponse = await axios.get(`http://localhost:5000/api/produit?categories=${response.data.categories}`);
        setRelatedProducts(relatedResponse.data.slice(0, 3)); // Limit to 3 related products
      } catch (error) {
        console.error("Error fetching product details or related products:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // Check if a token exists
  };

  // Add product to cart
  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toast.error("Vous devez être connecté pour ajouter un produit au panier.");
      navigate('/login');
      return;
    }
  
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = storedCart.findIndex(item => item.produitId === product._id);
  
    if (existingProductIndex !== -1) {
      const updatedCart = [...storedCart];
      updatedCart[existingProductIndex].quantite += quantity;
  
      if (updatedCart[existingProductIndex].quantite > product.stock) {
        updatedCart[existingProductIndex].quantite = product.stock;
        toast.error('Quantité mise à jour au stock disponible.');
      }
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newCart = [...storedCart, { produitId: product._id, quantite: quantity }];
  
      if (quantity > product.stock) {
        newCart[newCart.length - 1].quantite = product.stock;
        toast.error('Quantité ajustée au stock disponible.');
      }
  
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  
    // Trigger a custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  
    toast.success('Product added to cart!');
    setMessage('Product added to cart. Do you want to continue shopping or go to checkout?');
  };
  
  
  

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleContinueShopping = () => {
    setMessage('');
    navigate('/produit'); // Redirect to shop page
  };

  const handleGoToCheckout = () => {
    setMessage('');
    navigate('/Panier'); // Redirect to checkout page
  };

  if (!product) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div>
      <Menu />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>See more Details</p>
                <h1>{product.nom}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-product mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="single-product-img">
                <img src={product.image} alt={product.nom} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="single-product-content">
                <h3>{product.nom}</h3>
                <p className="single-product-pricing"><span>Per Kg</span> ${product.prix}</p>
                <p>{product.description}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Category:</strong> {product.categories}</p>

                {/* Quantity Input */}
                <div className="quantity-section">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    max={product.stock}
                    onChange={handleQuantityChange}
                    className="form-control"
                  />
                </div>

                {/* Add to Cart Button */}
                <button className="cart-btn" onClick={handleAddToCart}>
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
                
                {/* Message Display */}
                {message && (
                  <div className="alert alert-info mt-3" role="alert">
                    {message}
                    <div>
                      <button className="btn btn-primary me-2" onClick={handleContinueShopping}>Continue Shopping</button>
                      <button className="btn btn-secondary" onClick={handleGoToCheckout}>Go to Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="more-products mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3><span className="orange-text">Related</span> Products</h3>
                <p>Check out similar products related to {product.nom}.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <Link to={`/product/${relatedProduct._id}`}>
                      <img src={relatedProduct.image} alt={relatedProduct.nom} />
                    </Link>
                  </div>
                  <h3>{relatedProduct.nom}</h3>
                  <p className="product-price"><span>Per Kg</span> ${relatedProduct.prix}</p>
                  <Link to={`/product/${relatedProduct._id}`} className="cart-btn">
                    <i className="fas fa-shopping-cart"></i> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Carousel />
    </div>
  );
};

export default Details;
