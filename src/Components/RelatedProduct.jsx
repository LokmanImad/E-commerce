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
          {products.map((product, index) => (
            <div key={index} className="col-lg-4 col-md-6 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={`/src/img/Produit/${product.images[0]}`}
                      alt={product.nom}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <h3>{product.nom}</h3>
                <p className="product-price">
                  <span>Par unit</span> {product.prix} DH
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
