import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.css'; // Import your CSS file
import Menu from '../Menu';


function About() {
  return (
    <>
    <Menu/>
      {/* breadcrumb-section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>We sale fresh fruits</p>
                <h1>About Us</h1>
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
                  <h3>24/7 Support</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, quae!</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="text-content">
                  <h3>Secure Services</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, quae!</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="text-content">
                  <h3>Fast Delivery</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, quae!</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="info-box d-flex">
                <div className="icon-box">
                  <i className="fas fa-thumbs-up"></i>
                </div>
                <div className="text-content">
                  <h3>Customer Satisfaction</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, quae!</p>
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
          <h2>About <span className="highlighted-orange">Our Company</span></h2>
          <p className="company-text">
            We are a leading company in the electrical equipment industry, providing high-quality products and exceptional services to our clients worldwide. Our mission is to deliver innovative solutions and ensure customer satisfaction at every step.
          </p>
          <div className="qualities-list">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="quality-box d-flex">
                  <i className="fas fa-certificate"></i>
                  <p>Certified Quality</p>
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
                  <p>Trusted Partner</p>
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
                <h3>Our <span className="orange-text">Team</span></h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-team-item">
                <div className="team-bg team-bg-1"></div>
                <h4>Jimmy Doe <span>Farmer</span></h4>
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
                <h4>Marry Doe <span>Farmer</span></h4>
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
                <h4>Simon Joe <span>Farmer</span></h4>
                <ul className="social-link-team">
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end team section */}
    </>
  );
}

export default About;
