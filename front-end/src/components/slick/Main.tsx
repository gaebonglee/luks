import React, { useState } from "react";
import { menus } from "../../types/menus";
import "animate.css";
import "../../style/Main.scss";

const Main: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(menus[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [isSubcategoryVisible, setIsSubcategoryVisible] = useState(false);

  const selectedMenu = menus.find((menu) => menu.id === selectedId);
  const hoveredMenu = menus.find((menu) => menu.id === hoveredId);

  const handleMenuClick = (menuId: number) => {
    if (selectedId === menuId) {
      setIsSubcategoryVisible(false);
      setTimeout(() => {
        setSelectedId(null);
      }, 300);
    } else {
      setSelectedId(menuId);
      setIsSubcategoryVisible(true);
    }
  };
  const handleSubCategory = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    console.log(`Selected Subcategory: ${subcategory}`);
  };

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
                    onClick={() => handleMenuClick(menu.id)}
                    onMouseEnter={() => setHoveredId(menu.id)}
                    id="category"
                    className={selectedId === menu.id ? "selected" : ""}
                  >
                    <a>{menu.title}</a>
                    {/* 클릭된 메뉴일 때만 서브카테고리 렌더링 */}
                    {selectedId === menu.id && selectedMenu?.subcategories && (
                      <div
                        className={`subCategoryContents animate__animated ${
                          isSubcategoryVisible
                            ? "animate__fadeInDown"
                            : "animate__fadeOutUp"
                        }`}
                      >
                        <ul>
                          {selectedMenu.subcategories.map((subcategory) => (
                            <li
                              key={subcategory}
                              onClick={() => handleSubCategory(subcategory)}
                            >
                              {subcategory}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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