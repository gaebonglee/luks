import React, { useState } from "react";
import { menus } from "../../types/menus";
import "animate.css";
import "../../style/Main.scss";

const Main: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(menus[0].id);
  const hoveredMenu = menus.find((menu) => menu.id === hoveredId);

  return (
    <section className="MainContainer">
      <div className="mainGrid">
        <div className="content_grid">
          <div id="intro_main">
            <div className="mainMenus">
              <ul>
                {menus.map((menu) => (
                  <li
                    key={menu.id}
                    data-id={menu.id}
                    onMouseEnter={() => setHoveredId(menu.id)}
                    id="category"
                  >
                    <a>{menu.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* hover된 메뉴에 맞는 이미지 표시 */}
            <div className="mainImages">
              {hoveredMenu && (
                <div className="main_image active">
                  <img src={hoveredMenu.imageUrl} alt={hoveredMenu.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
