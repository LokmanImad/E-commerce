import React from 'react';
import './main.css';

// const Test = () => {
//   return (
//     <div className="list-section pt-80 pb-80">
//       <div className="container">
//         <div className="list-row d-flex">
//           <div className="list-box d-flex align-items-center">
//             <div className="list-icon">
//               <i className="fas fa-shipping-fast"></i>
//             </div>
//             <div className="content">
//               <h3>Free Shipping</h3>
//               <p>When order over $75</p>
//             </div>
//           </div>
//           <div className="list-box d-flex align-items-center">
//             <div className="list-icon">
//               <i className="fas fa-phone-volume"></i>
//             </div>
//             <div className="content">
//               <h3>24/7 Support</h3>
//               <p>Get support all day</p>
//             </div>
//           </div>
//           <div className="list-box d-flex align-items-center">
//             <div className="list-icon">
//               <i className="fas fa-sync"></i>
//             </div>
//             <div className="content">
//               <h3>Refund</h3>
//               <p>Get refund within 3 days!</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Test= () => {
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
    <div className="logo-carousel-section">
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

export default Test;
