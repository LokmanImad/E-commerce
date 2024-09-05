import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'; // Assurez-vous d'inclure le fichier CSS pour le style
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const Menu= () => {
  return (
    <div className="top-header-area" id="sticker">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="main-menu-wrap">
              {/* logo */}
              <div className="site-logo">
                <a href="index.html">
                  <img src="/src/img/EROTMAN.png"  alt="Site Logo" />
                </a>
              </div>
              {/* logo */}

              {/* menu start */}
              <nav className="main-menu">
                <ul>
                  <li className="current-list-item">
                    <a href="#">Home</a>
                    <ul className="sub-menu">
                      <li><a href="index.html">Static Home</a></li>
                      <li><a href="index_2.html">Slider Home</a></li>
                    </ul>
                  </li>
                  <li><a href="about.html">About</a></li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li><a href="404.html">404 page</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="cart.html">Cart</a></li>
                      <li><a href="checkout.html">Check Out</a></li>
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="news.html">News</a></li>
                      <li><a href="shop.html">Shop</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="news.html">News</a>
                    <ul className="sub-menu">
                      <li><a href="news.html">News</a></li>
                      <li><a href="single-news.html">Single News</a></li>
                    </ul>
                  </li>
                  <li><a href="contact.html">Contact</a></li>
                  <li>
                    <a href="shop.html">Shop</a>
                    <ul className="sub-menu">
                      <li><a href="shop.html">Shop</a></li>
                      <li><a href="checkout.html">Check Out</a></li>
                      <li><a href="single-product.html">Single Product</a></li>
                      <li><a href="cart.html">Cart</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="header-icons">
                      <a className="shopping-cart" href="cart.html">
                        <i className="fas fa-shopping-cart"></i>
                      </a>
                      <a className="mobile-hide search-bar-icon" href="#">
                        <i className="fas fa-search"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <a className="mobile-show search-bar-icon" href="#">
                <i className="fas fa-search"></i>
              </a>
              <div className="mobile-menu"></div>
              {/* menu end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
