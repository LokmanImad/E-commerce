import React , { useState, useEffect }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'; // Assurez-vous d'inclure le fichier CSS pour le style
import { Link,  useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';




const Menu= () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.reduce((total, item) => total + item.quantite, 0));
    };

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    updateCartCount();

    // Add event listener for cartUpdated event
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Redirect to login page
  };

  


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
                    <Link to={'/'}>Home</Link>
                   
                  </li>
                  <li><Link to={"/About"}>About</Link></li>
                  {/* <li>
                    <a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li><a href="404.html">404 page</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="cart.html">Cart</a></li>
                      <li><a href="checkout.html">Check Out</a></li>
                      <li><Link to={"/Contacte"}>Contact</Link></li>
                      <li><a href="news.html">News</a></li>
                      <li><a href="shop.html">Shop</a></li>
                    </ul>
                  </li> */}
                  <li>
                    <Link to={"/projet"}>Projets</Link>
                    
                  </li>
                  <li><Link to={"/Contacte"}>Contact</Link></li>
                  <li>
                    <Link to={'/Produit'}>Shop</Link>
                    <ul className="sub-menu">
                      <li><a href="shop.html">Shop</a></li>
                      <li><a href="checkout.html">Check Out</a></li>
                      <li><a href="single-product.html">Single Product</a></li>
                      <li><a href="cart.html">Cart</a></li>
                    </ul>
                  </li>
                  <li>
                    <div className="header-icons">
                      {/* Panier Icon */}
                      <Link className="shopping-cart" to="/Panier">
                        <i className="fas fa-shopping-cart"></i>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                      </Link>
                     



                      {isLoggedIn && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item"   to="/profil"> Profil</Link></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                      </ul>
                    </li>
                  )}









                      
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
