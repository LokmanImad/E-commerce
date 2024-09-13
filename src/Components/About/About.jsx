import React , {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.css'; // Import your CSS file
import Menu from '../Menu';
import Footer from '../Footer/Footer';


function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Menu/>
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Innovative & Reliable</p>
                <h1>À propos de nous</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}

    {/* new featured section */}
<div className="feature-background">
  <div className="container">
    <div className="row align-items-center"> {/* Alignement vertical */}
      <div className="col-lg-7">
        <div className="highlighted-text">
          <h2 className="pb-3">Why Choose <span className="highlighted-orange">Our Service</span></h2>
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="text-content">
                  <h3>24/7 Assistance</h3>
                  <p>Assistance 24/7, toujours disponible pour répondre à vos besoins.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="text-content">
                  <h3>Services sécurisés</h3>
                  <p>Nos services garantissent une sécurité maximale pour votre tranquillité d'esprit.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="text-content">
                  <h3>Livraison rapide</h3>
                  <p>Livraison rapide et efficace, pour une satisfaction optimale et sans délai.!</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-thumbs-up"></i>
                </div>
                <div className="text-content">
                  <h3>Satisfaction client</h3>
                  <p>Votre satisfaction est notre priorité, nous offrons des produits de qualité avec un service personnalisé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image on the right */}
      <div className="col-lg-5 d-none d-lg-block">
        <div className="image-box">
          <img src="/src/img/Produit/1725982711392.jpeg" alt="Why Choose Us" className="img-fluid img-small" />
        </div>
      </div>
    </div>
  </div>
</div>

      {/* end featured section */}
{/* Company description section */}
<div className="company-description-section">
  <div className="container">
    <div className="row align-items-center">
      {/* Left side with image */}
      <div className="col-lg-5">
        <div className="company-image-box">
          <img src="/src/img/EROTMAN.png" alt="About Us" className="img-fluid" />
        </div>
      </div>
      
      {/* Right side with company description */}
      <div className="col-lg-7">
        <div className="company-info">
          <h2>À propos <span className="highlighted-orange">de notre entreprise</span></h2>
          <p className="company-text">
          Chez E-rotman, nous sommes experts dans la fourniture et la gestion d'équipements électriques de haute qualité, ainsi que dans la réalisation de projets électriques complexes. Depuis notre création, nous avons dédié nos efforts à offrir des solutions innovantes et fiables pour répondre aux besoins diversifiés de nos clients. Notre expertise inclut non seulement la vente et l'achat de matériel électrique, mais également la gestion complète de projets d'électricité, de la conception à la mise en œuvre. Avec une équipe de professionnels expérimentés, nous nous engageons à offrir un service client exceptionnel et à garantir la réussite de chaque projet. E-rotman est votre partenaire de confiance pour vos besoins en équipement électrique et pour la gestion de vos projets électriques.
          </p>
          <div className="qualities-list">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="quality-box d-flex">
                  <i className="fas fa-certificate"></i>
                  <p>Qualité certifiée</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="quality-box d-flex">
                  <i className="fas fa-users"></i>
                  <p>Customer Focused</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="quality-box d-flex">
                  <i className="fas fa-globe"></i>
                  <p>Global Reach</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="quality-box d-flex">
                  <i className="fas fa-handshake"></i>
                  <p>Partenaire de confiance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* team section */}
      <div className="mt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>Notre <span className="orange-text">Équipe</span></h3>
                <p>Notre équipe dédiée, professionnelle et passionnée vous accompagne à chaque étape.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-team-item">
                <div className="team-bg team-bg-1"></div>
                <h4>Mohammed <span>Mohammed</span></h4>
                <ul className="social-link-team">
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-item">
                <div className="team-bg team-bg-2"></div>
                <h4>Mohammed<span>Mohammed</span></h4>
                <ul className="social-link-team">
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
              <div className="single-team-item">
                <div className="team-bg team-bg-3"></div>
                <h4>Mohammed<span>Mohammed</span></h4>
                <ul className="social-link-team">
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      {/* end team section */}
    </>
  );
}

export default About;
