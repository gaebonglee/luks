import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style/MainScreen.scss";

const MainScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    { id: 1, imgUrl: "https://via.placeholder.com/800x400?text=Slide+1" },
    { id: 2, imgUrl: "https://via.placeholder.com/800x400?text=Slide+2" },
    { id: 3, imgUrl: "https://via.placeholder.com/800x400?text=Slide+3" },
    { id: 4, imgUrl: "https://via.placeholder.com/800x400?text=Slide+4" },
    { id: 5, imgUrl: "https://via.placeholder.com/800x400?text=Slide+5" },
  ];

  return (
    <div className="slider_container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img src={slide.imgUrl} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainScreen;
