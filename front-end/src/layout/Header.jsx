import React from "react";
import { Link } from "react-router-dom";

import "../style/Header.scss";

//아이콘
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  //카테고리
  const handleMouseEnterLong = () => {
    document.getElementById("header").style.height = "260px";
  };

  const handleMouseEnterNormal = () => {
    document.getElementById("header").style.height = "230px";
  };

  const handleMouseEnterShort = () => {
    document.getElementById("header").style.height = "210px";
  };

  const handleMouseLeave = () => {
    document.getElementById("header").style.height = "130px";
  };
  return (
    <header id="header">
      <div className="header_container">
        <div className="header_flex">
          <div className="header_logo">
            <Link to="/">
              <img src="/images/luks_logo.jpg" alt="mainLogo" />
            </Link>
          </div>
          <div className="header_user">
            <div className="header_search">
              <FiSearch />
            </div>
            <div className="header_member">
              <Link to="/login">
                <FaRegUser />
              </Link>
            </div>
            <div className="header_like">
              <Link>
                <FaHeart />
              </Link>
            </div>
            <div className="header_mybag">
              <Link>
                <IoBag />
              </Link>
            </div>
          </div>
        </div>
        <div className="header_menu_container">
          <div className="header_menu_padding">
            <ul className="header_menu_category">
              <li
                className="menu_category_li"
                onMouseEnter={handleMouseEnterLong}
                onMouseLeave={handleMouseLeave}
              >
                <a>TOP</a>
                <div className="subCategory">
                  <ul>
                    <li>
                      <a>
                        <Link>티셔츠</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>맨투맨/후드</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>셔츠</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>블라우스</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>니트</Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="menu_category_li"
                onMouseEnter={handleMouseEnterLong}
                onMouseLeave={handleMouseLeave}
              >
                <a>BOTTOM</a>
                <div className="subCategory">
                  <ul>
                    <li>
                      <a>
                        <Link>데님</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>팬츠</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>슬랙스</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>쇼츠</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>트레이닝 팬츠</Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="menu_category_li"
                onMouseEnter={handleMouseEnterNormal}
                onMouseLeave={handleMouseLeave}
              >
                <a>OUTER</a>
                <div className="subCategory">
                  <ul>
                    <li>
                      <a>
                        <Link>코트</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>자켓</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>가디건</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>점퍼</Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="menu_category_li"
                onMouseEnter={handleMouseEnterShort}
                onMouseLeave={handleMouseLeave}
              >
                <a>OPS/SK</a>
                <div className="subCategory">
                  <ul>
                    <li>
                      <a>
                        <Link>원피스</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>미니 스커트</Link>
                      </a>
                    </li>
                    <li>
                      <a>
                        <Link>미디-롱 스커트</Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu_category_li">
                <a>
                  <Link>T-EMPERTURE</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
