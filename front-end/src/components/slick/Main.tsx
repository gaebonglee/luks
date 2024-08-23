import React, { useState } from "react";
import { slides } from "../../types/slides";
import "../../style/MainSlide.scss";

const Main: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(slides[0].id);
  const selectedSlide = slides.find((slide) => slide.id === selectedId);

  return (
    <section className="MainContainer">
      <div className="mainGrid">
        <div className="content_grid">
          <div id="intro_main">
            <div className="mainMenus">
              <ul>
                {slides.map((slide) => (
                  <li
                    key={slide.id}
                    data-id={slide.id}
                    onClick={() => setSelectedId(slide.id)}
                    id="category"
                  >
                    <a>
                      <span>{slide.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mainImages">
              {selectedSlide && (
                <div
                  className="main_image"
                  data-id={selectedSlide.id}
                  style={{
                    backgroundImage: `url(${selectedSlide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
