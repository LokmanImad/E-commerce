import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.css'; // Assurez-vous de créer un fichier CSS séparé pour les styles
import Carousel from './Carousel';
import Menu from './Menu';



const First = () => {
  return (
    <>
    <div className="hero-area hero-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 offset-lg-2 text-center">
            <div className="hero-text">
              <div className="hero-text-tablecell">
                <p className="subtitle">Fresh & Organic</p>
                <h1>E-Rotman import & export</h1>
                <div className="hero-btns">
                  <a href="shop.html" className="boxed-btn">Fruit Collection</a>
                  <a href="contact.html" className="bordered-btn">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    
    </>






  );
};

const Test = () => {
  return (
    <div className="list-section pt-80 pb-80">
      <div className="container">
        <div className="list-row d-flex">
          <div className="list-box d-flex align-items-center">
            <div className="list-icon">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <div className="content">
              <h3>Free Shipping</h3>
              <p>When order over $75</p>
            </div>
          </div>
          <div className="list-box d-flex align-items-center">
            <div className="list-icon">
              <i className="fas fa-phone-volume"></i>
            </div>
            <div className="content">
              <h3>24/7 Support</h3>
              <p>Get support all day</p>
            </div>
          </div>
          <div className="list-box d-flex align-items-center">
            <div className="list-icon">
              <i className="fas fa-sync"></i>
            </div>
            <div className="content">
              <h3>Refund</h3>
              <p>Get refund within 3 days!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const AdvertisementSection = () => {
  return (
    <div className="abt-section mb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="abt-bg">
            <img src='src/img/logo/logo2.jpeg' />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="abt-text">
              <p className="top-sub">Since Year 2022</p>
              <h2>
                We are <span className="orange-text">E-Rotman</span>
              </h2>
              <p>
                


<strong>E-Rotman Import Export,</strong> depuis 2022, se consacre à l'import et à l'export de matériels électriques. Nous offrons une vaste gamme de produits de qualité, incluant câbles, interrupteurs et dispositifs de sécurité, adaptés aux besoins diversifiés de nos clients.
              </p>
              <p>
              Notre engagement est de fournir des solutions fiables et économiques tout en assurant un service client impeccable. Grâce à notre réseau international, nous garantissons des produits conformes aux standards les plus élevés, vous permettant de réaliser vos projets électriques en toute confiance.
              </p>
              <a href="about.html" className="boxed-btn mt-4">
                know more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopBanner = () => {
  return (
    <section className="shop-banner">
      <div className="container">
        <h3>
          December sale is on! <br /> with big <span className="orange-text">Discount...</span>
        </h3>
        <div className="sale-percent">
          <span>Sale! <br /> Upto</span>50% <span>off</span>
        </div>
        <a href="shop.html" className="cart-btn btn-lg">
          Shop Now
        </a>
      </div>
    </section>
  );
};



const Home = () => {
  return (
    <>
        <Menu/>
        <First/>
        <Test/>
      <AdvertisementSection />
      <ShopBanner />
      <Carousel/>

    </>
  );
};

export default Home;


