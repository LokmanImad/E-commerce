import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const products = [
    { id: 1, name: 'Strawberry', price: 85, category: 'strawberry', img: 'assets/img/products/product-img-1.jpg' },
    { id: 2, name: 'Berry', price: 70, category: 'berry', img: 'assets/img/products/product-img-2.jpg' },
    { id: 3, name: 'Lemon', price: 35, category: 'lemon', img: 'assets/img/products/product-img-3.jpg' },
    { id: 4, name: 'Avocado', price: 50, category: 'avocado', img: 'assets/img/products/product-img-4.jpg' },
    { id: 5, name: 'Green Apple', price: 45, category: 'apple', img: 'assets/img/products/product-img-5.jpg' },
    
    { id: 6, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 7, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 8, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 9, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 10, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 11, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 12, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 13, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 14, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 15, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 16, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 17, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 18, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
    { id: 20, name: 'Strawberry', price: 80, category: 'strawberry', img: 'assets/img/products/product-img-6.jpg' },
   

  ];

  // Filtering products based on the active filter
  const filteredProducts = activeFilter === '*'
    ? products
    : products.filter(product => product.category === activeFilter);

  // Calculate the products to show on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
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
                  <li className={activeFilter === 'strawberry' ? 'active' : ''} onClick={() => handleFilterChange('strawberry')}>Strawberry</li>
                  <li className={activeFilter === 'berry' ? 'active' : ''} onClick={() => handleFilterChange('berry')}>Berry</li>
                  <li className={activeFilter === 'lemon' ? 'active' : ''} onClick={() => handleFilterChange('lemon')}>Lemon</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row product-lists">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <img src={product.img} alt={product.name} />
                    </a>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="product-price"><span>Per Kg</span> {product.price}$</p>
                  <a href="cart.html" className="cart-btn">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </a>
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
                      href="#!"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </a>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1}>
                      <a
                        href="#!"
                        onClick={() => handlePageChange(number + 1)}
                        className={currentPage === number + 1 ? 'active' : ''}
                      >
                        {number + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#!"
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
    </div>
  );
};

export default Shop;
