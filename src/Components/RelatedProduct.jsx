import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './main.css'; // Assurez-vous de créer ce fichier pour les styles CSS

const RelatedProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produit'); // Modify API endpoint accordingly
        setProducts(response.data.slice(0, 3)); // Fetch and display 4 related products
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, []);

  return (
    <div className="more-products mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
              <h3 >
                <span className="orange-text">Produits</span> Connexes
              </h3>
              <p>Découvrez nos produits.</p>
            </div>
          </div>
        </div>
        <div className="row">
        {products.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                {product.promotion > 0 && (
                            <div className="promotion-badge">
                              {(((product.prix -  product.promotion)/product.prix)*100 ).toFixed(2)}% OFF
                            </div>
                          )}
                  <div className="product-image">
                    <Link to={`/produit/${product._id}`}>
                      <img src={`/src/img/Produit/${product.images[0]}`} alt={product.nom} />
                    </Link>
                  </div>
                  <h3>{product.nom}</h3>

                  <p className="single-product-pricing">
    <span>Par unité : </span>
    {product.promotion > 0 ? (
      <>
       
        <span className="promotion-price" style={{ color: 'green' , fontSize: '1.8em' }}><strong>{product.promotion} DH</strong>
          
        </span>
      </>
    ) : (
      <span style={{  fontSize: '1.8em' }} > <strong>{product.prix} DH</strong></span>
    )}
  </p>
                <Link to={`/product/${product._id}`} className="cart-btn btn btn-primary">
                  <i className="fas fa-shopping-cart"></i> Voir les Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
