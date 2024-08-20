import React, { useState } from "react";
import { slides } from "../../types/slides";
import "../../style/MainSlide.scss";
//아이콘
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const MainSlide: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState<boolean>(false);

  const handlePrevSlide = () => {
    if (animating) return;
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setAnimating(false);
    }, 300);
  };

  const handleNextSlide = () => {
    if (animating) return;
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 300);
  };
  return (
    <section className="slideSection">
      <div className="slider_container">
        <div className="slider_content">
          <div className={`slide_info ${animating ? "slide-out" : "slide-in"}`}>
            <p>0{slides[currentSlide].id}</p>
            <h3>{slides[currentSlide].title}</h3>
          </div>
          <div
            className={`slide_image ${animating ? "slide-out" : "slide-in"}`}
          >
            <img
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].title}
            />
          </div>
          <div className="slide_controlWrap">
            <div className="slide_controls">
              <button onClick={handlePrevSlide} className="arrowLeft">
                <FaArrowLeft />
              </button>
              <button onClick={handleNextSlide} className="arrowRight">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSlide;
