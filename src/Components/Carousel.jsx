import React from 'react';
import './main.css';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel= () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="logo-carousel-section" style={{ backgroundColor: '#ffffff', padding: '20px 0' }}>
      <div className="container">
        <Slider {...settings} className="logo-carousel-inner">
          <div className="single-logo-item">
            <img src="assets/img/company-logos/1.png" alt="Company Logo 1" />
          </div>
          <div className="single-logo-item">
            <img src="assets/img/company-logos/2.png" alt="Company Logo 2" />
          </div>
          <div className="single-logo-item">
            <img src="assets/img/company-logos/3.png" alt="Company Logo 3" />
          </div>
          <div className="single-logo-item">
            <img src="assets/img/company-logos/4.png" alt="Company Logo 4" />
          </div>
          <div className="single-logo-item">
            <img src="assets/img/company-logos/5.png" alt="Company Logo 5" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
