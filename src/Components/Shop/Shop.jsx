import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import Footer from '../Footer/Footer';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsPerPage = 8;

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/produit/'); // Update with your actual API URL
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Filtering products based on the active filter
  const filteredProducts = activeFilter === '*'
    ? products
    : products.filter(product => product.categories === activeFilter);

  // Calculate the products to show on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Breadcrumb Section */}
      <Menu/>
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Innovative & Reliable</p>
                <h1>Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-filters">
                <ul>
                  <li className={activeFilter === '*' ? 'active' : ''} onClick={() => handleFilterChange('*')}>All</li>
                  <li className={activeFilter === 'Lustre' ? 'active' : ''} onClick={() => handleFilterChange('Lustre')}>Lustre</li>
                  <li className={activeFilter === 'Applique' ? 'active' : ''} onClick={() => handleFilterChange('Applique')}>Applique-murale</li>
                  <li className={activeFilter === 'Solar' ? 'active' : ''} onClick={() => handleFilterChange('Solar')}>Solar</li>
                  <li className={activeFilter === 'Spot' ? 'active' : ''} onClick={() => handleFilterChange('Spot')}>Spot</li>

                </ul>
              </div>
            </div>
          </div>

          <div className="row product-lists">
            {currentProducts.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-6 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <Link to={`/produit/${product._id}`}>
                        <div className="product-image-wrapper">
                          {product.promotion > 0 && (
                            <div className="promotion-badge">
                              {(((product.prix -  product.promotion)/product.prix)*100 ).toFixed(2)}% OFF
                            </div>
                          )}
                          <img src={`/src/img/Produit/${product.images[0]}`} alt={product.nom} />
                        </div>
                      </Link>
                    </a>
                  </div>
                  <h3>{product.nom}</h3>
                  <p className="product-price" >
                    {product.promotion > 0 ? (
                      <>
                        <span className="original-price" >{product.prix} DH</span>
                        <span className="discounted-price" style={{  fontSize: '0.8em', fontWeight: 'bold' }}  >
                          {product.promotion } DH 
                        </span>
                      </>
                    ) : (
                      <span style={{  fontSize: '0.8em', fontWeight: 'bold' }}>{product.prix} DH</span>
                    )}
                  </p>
                  <Link to={`/produit/${product._id}`} className="cart-btn">
                    <i className="fas fa-shopping-cart"></i> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="pagination-wrap">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </a>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1}>
                      <a
                        href="#"
                        onClick={() => handlePageChange(number + 1)}
                        className={currentPage === number + 1 ? 'active' : ''}
                      >
                        {number + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Shop;
