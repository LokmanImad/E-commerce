
import React from 'react';
import './main.css'
import Menu from '../Menu';
import Footer from '../Footer/Footer';

const Contact = () => {
  return (
    <div>
      <Menu/>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Bénéficiez d'une assistance 24h/7j</p>
                <h1>Contactez-nous</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <h2>Avez-vous des questions ?</h2>
                <p>Si vous avez des interrogations ou souhaitez obtenir plus d'informations, n'hésitez pas à nous contacter. Notre équipe se tient à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet</p>
              </div>
              <div id="form_status"></div>
              <div className="contact-form">
                <form id="fruitkha-contact">
                  <p>
                    <input type="text" placeholder="Name" name="name" id="name" />
                    <input type="email" placeholder="Email" name="email" id="email" />
                  </p>
                  <p>
                    <input type="tel" placeholder="Phone" name="phone" id="phone" />
                    <input type="text" placeholder="Subject" name="subject" id="subject" />
                  </p>
                  <p>
                    <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                  </p>
                  <input type="hidden" name="token" value="FsWga4&@f6aw" />
                  <p>
                    <input type="submit" value="Submit" />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h4><i className="fas fa-map"></i>Address</h4>
                  <p>N° 66 Av. Al Qods <br /> Tanger 90060 <br />Maroc</p>
                </div>
                <div className="contact-form-box">
                  <h4><i className="far fa-clock"></i>Horaires d'ouverture</h4>
                  <p>Lundi - Vendredi : 9:00 - 20:00  <br /> Samedi : 9:00 - 18:00  </p>
                </div>
                <div className="contact-form-box">
                  <h4><i className="fas fa-address-book"></i> Contact</h4>
                  <p>Telephone: +212 5 22 34 42 <br /> Email: support@Ertoman.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Our Location */}
      <div className="find-location blue-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p><i className="fas fa-map-marker-alt"></i> Find Our Location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="embed-responsive embed-responsive-21by9">
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12952.046065284312!2d-5.7996414!3d35.7505217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b81c162bf7b7f%3A0xeb15f97162f23950!2sEROTMAN_ENERGY!5e0!3m2!1sfr!2sma!4v1725370810084!5m2!1sfr!2sma"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          className="embed-responsive-item"
        ></iframe>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
