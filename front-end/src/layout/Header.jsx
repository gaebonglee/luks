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
                <Link to={`/category/top`}>TOP</Link>
                <div className="subCategory">
                  <ul>
                    <li>
                      <Link to={`/category/top/티셔츠`}>티셔츠</Link>
                    </li>
                    <li>
                      <Link>맨투맨/후드</Link>
                    </li>
                    <li>
                      <Link>셔츠</Link>
                    </li>
                    <li>
                      <Link>블라우스</Link>
                    </li>
                    <li>
                      <Link>니트</Link>
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
                      <Link>데님</Link>
                    </li>
                    <li>
                      <Link>팬츠</Link>
                    </li>
                    <li>
                      <Link>슬랙스</Link>
                    </li>
                    <li>
                      <Link>쇼츠</Link>
                    </li>
                    <li>
                      <Link>트레이닝 팬츠</Link>
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
                      <Link>코트</Link>
                    </li>
                    <li>
                      <Link>자켓</Link>
                    </li>
                    <li>
                      <Link>가디건</Link>
                    </li>
                    <li>
                      <Link>점퍼</Link>
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
                      <Link>원피스</Link>
                    </li>
                    <li>
                      <Link>미니 스커트</Link>
                    </li>
                    <li>
                      <Link>미디-롱 스커트</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu_category_li">
                <Link>T-EMPERTURE</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
