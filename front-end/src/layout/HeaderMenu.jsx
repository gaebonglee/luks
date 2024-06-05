import React from "react";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const handleMouseEnterLong = () => {
    document.getElementById("header").style.height = "260px";
  };

  const handleMouseEnterNormal = () => {
    document.getElementById("header").style.height = "235px";
  };

  const handleMouseEnterShort = () => {
    document.getElementById("header").style.height = "215px";
  };

  const handleMouseLeave = () => {
    document.getElementById("header").style.height = "135px";
  };

  return (
    <div className="header_menu_container">
      <div className="header_menu_padding">
        <ul className="header_menu_category">
          <li
            className="menu_category_li"
            onMouseEnter={handleMouseEnterLong}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/category/top`}>TOP</Link>
            <div className="subCategory">
              <ul>
                <li>
                  <Link to={`/category/top/t-shirts`}>티셔츠</Link>
                </li>
                <li>
                  <Link to={`/category/top/sweatshirt&hoodie`}>
                    맨투맨/후드
                  </Link>
                </li>
                <li>
                  <Link to={`/category/top/shirts`}>셔츠</Link>
                </li>
                <li>
                  <Link to={`/category/top/blouse`}> 블라우스</Link>
                </li>
                <li>
                  <Link to={`/category/top/knit`}>니트</Link>
                </li>
              </ul>
            </div>
          </li>
          <li
            className="menu_category_li"
            onMouseEnter={handleMouseEnterLong}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/category/bottom`}>BOTTOM</Link>
            <div className="subCategory">
              <ul>
                <li>
                  <Link to={`/category/bottom/denim`}>데님</Link>
                </li>
                <li>
                  <Link to={`/category/bottom/pants`}>팬츠</Link>
                </li>
                <li>
                  <Link to={`/category/bottom/slacks`}>슬랙스</Link>
                </li>
                <li>
                  <Link to={`/category/bottom/shorts`}>쇼츠</Link>
                </li>
                <li>
                  <Link to={`/category/bottom/trainningPants`}>
                    트레이닝 팬츠
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li
            className="menu_category_li"
            onMouseEnter={handleMouseEnterNormal}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/category/outer`}>OUTER</Link>
            <div className="subCategory">
              <ul>
                <li>
                  <Link to={`/category/outer/coat`}>코트</Link>
                </li>
                <li>
                  <Link to={`/category/outer/jacket`}>자켓</Link>
                </li>
                <li>
                  <Link to={`/category/outer/cardigan`}>가디건</Link>
                </li>
                <li>
                  <Link to={`/category/outer/jumper`}>점퍼</Link>
                </li>
              </ul>
            </div>
          </li>
          <li
            className="menu_category_li"
            onMouseEnter={handleMouseEnterShort}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/category/ops&sk`}>OPS/SK</Link>
            <div className="subCategory">
              <ul>
                <li>
                  <Link to={`/category/ops&sk/ops`}>원피스</Link>
                </li>
                <li>
                  <Link to={`/category/ops&sk/miniSkirt`}>미니 스커트</Link>
                </li>
                <li>
                  <Link to={`/category/ops&sk/midiLongSkirt`}>
                    미디-롱 스커트
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="menu_category_li">
            <Link to={"/t-emperature"}>T-EMPERTURE</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
