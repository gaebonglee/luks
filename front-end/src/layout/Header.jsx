import React, { useEffect, useState } from "react";
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
                      <Link to={`/category/bottom/trainningPants`}>트레이닝 팬츠</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="menu_category_li"
                onMouseEnter={handleMouseEnterNormal}
                onMouseLeave={handleMouseLeave}
              >
                 <Link to={`/outer`}>OUTER</Link>
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
                <Link to={`/outer`}>OPS/SK</Link>
                <div className="subCategory">
                  <ul>
                    <li>
                      <Link to={`/category/ops&sk/ops`}>원피스</Link>
                    </li>
                    <li>
                      <Link to={`/category/ops&sk/miniSkirt`}>미니 스커트</Link>
                    </li>
                    <li>
                      <Link to={`/category/ops&sk/midiLongSkirt`}>미디-롱 스커트</Link>
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
      </div>
    </header>
  );
};

export default Header;
