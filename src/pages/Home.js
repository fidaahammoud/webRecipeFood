import React from 'react';
import PageContent from '../components/PageContent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import appetizer from "../images/appetizer.jpg";
import dessert from "../images/dessert.jpg";
import dinner from "../images/dinner.jpg";
import pasta from "../images/pasta.jpg";
import salad from "../images/salad.jpg";

function HomePage() {
  const images = [appetizer, dessert, dinner, pasta, salad];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <PageContent title="Welcome!" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <p>Nutritionally balanced, easy to cook recipes. Quality fresh local ingredients.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "50%" }}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default HomePage;
