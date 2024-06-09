import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../../style/MainScreen.scss";

import { Pagination, Autoplay } from "swiper/modules";

const MainScreen = () => {
  const slides = [
    { id: 1, imgUrl: "/images/mainscreen5.jpg" },
    { id: 2, imgUrl: "/images/mainscreen4.jpg" },
    { id: 3, imgUrl: "/images/mainscreen3.jpg" },
    { id: 4, imgUrl: "/images/mainscreen2.jpg" },
    { id: 5, imgUrl: "/images/mainscreen1.jpg" },
  ];

  return (
    <div className="slider_container">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        speed={1000} 
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.imgUrl} alt={`Slide ${slide.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="otherContents">
        <div className="bnImg">
          <img src="/images/main1.png" alt="Main 1" />
          <img src="/images/main2.png" alt="Main 2" />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
