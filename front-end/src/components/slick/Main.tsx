import React, { useState } from "react";
import { slides } from "../../types/slides";
import "../../style/Main.scss";

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
                    onMouseEnter={() => setSelectedId(slide.id)}
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
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={`main_image ${
                    selectedId === slide.id ? "active" : ""
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
