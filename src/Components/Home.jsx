import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.css'; // Assurez-vous de créer un fichier CSS séparé pour les styles
import Carousel from './Carousel';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';
import Footer from './Footer/Footer';



const First = () => {
  return (
    <>
    <div className="breadcrumb-section hero-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 offset-lg-2 text-center">
            <div className="hero-text">
              <div className="hero-text-tablecell">
                <p className="subtitle">Innovative & Reliable</p>
                <h1>E-Rotman import & export</h1>
                <div className="hero-btns">
                  <Link to="/Produit"  className="boxed-btn">Produit</Link>
                  <Link to="/Contacte" className="bordered-btn">Contactez-nous</Link>
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
              <i className="fas fa-certificate"></i>
            </div>
            <div className="content">
              <h3>Produit qualité</h3>
              <p>Excellence, durabilité, et performance</p>
            </div>
          </div>
          <div className="list-box d-flex align-items-center">
            <div className="list-icon">
              <i className="fas fa-phone-volume"></i>
            </div>
            <div className="content">
              <h3>24/7 Assistance</h3>
              <p>Bénéficiez d'un soutien toute la journée</p>
            </div>
          </div>
          <div className="list-box d-flex align-items-center">
            <div className="list-icon">
              <i className="fas fa-clipboard"></i>
            </div>
            <div className="content">
              <h3>Devis</h3>
              <p>Rapide, précis, et gratuit</p>
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
              <Link to={"/About"} className="boxed-btn mt-4">
                know more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProjectVideoSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="project-video-section mb-150">
      <div className="container">
        <div className="row align-items-center">
          {/* Texte à gauche */}
          <div className="col-lg-6 text-left">
            <h2 className="section-title">Découvrez notre dernier projet</h2>
            <p>
              Nous sommes fiers de vous présenter notre tout dernier projet.
              Découvrez comment nous avons utilisé les dernières technologies
              pour atteindre les objectifs et livrer un projet de qualité.
            </p>
          </div>
          {/* Vidéo à droite */}
          <div className="col-lg-6">
            <div className="video-container">
              <video
                className="responsive-video"
                controls
                onClick={toggleModal} // Ouvrir la modal au clic
              >
                <source src="src/img/Video/video.mp4" type="video/mp4" />
                Votre navigateur ne prend pas en charge la vidéo.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour la vidéo agrandie */}
      {isModalOpen && (
        <div className="video-modal" onClick={toggleModal}>
          <div className="modal-content">
            <video className="modal-video" controls autoPlay>
              <source src="src/img/Video/video.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la vidéo.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

const ShopBanner = () => {
  return (
    <section className="shop-banner">
      <div className="container">
        <h3>
        Soldes de décembre <br /> avec grandes <span className="orange-text">promotions...</span>
        </h3>
        <div className="sale-percent">
          <span>Sale! <br /> Upto</span>50% <span>off</span>
          <h6 className='mb-3'>       Coupon : 111</h6>
          
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
      <RelatedProduct  />
      {/* <ProjectVideoSection/> */}
      <ShopBanner />
      <Carousel/>
      <Footer/>

    </>
  );
};

export default Home;


