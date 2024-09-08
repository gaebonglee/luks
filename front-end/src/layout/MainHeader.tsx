import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ShopNav from "./ShopNav";
import GuestNav from "./GuestNav";
import MemberNav from "./MemberNav";
import "../style/layout/Header.scss";
import Swal from "sweetalert2";
import { checkSession } from "../types/checkSession";

const MainHeader: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isShopNavVisible, setIsShopNavVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const loggedIn = await checkSession();
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    };
    checkUserSession();
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        Swal.fire("로그아웃 되었습니다.").then(() => {
          setIsLoggedIn(false);
          navigate("/"); // 상태가 업데이트된 후 페이지 이동
        });
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const handleShopNavEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    setIsShopNavVisible(true);
  };

  const handleShopNavLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsShopNavVisible(false);
    }, 200); // 200ms 정도의 딜레이를 줍니다.
  };

  return (
    <header id="header">
      <div className="header_container">
        <div className="header_flex">
          <div className="header-left">
            <div className="category">
              <ul className="list">
                <li>NEW</li>
                <li>BEST</li>
                <li
                  onMouseEnter={handleShopNavEnter}
                  onMouseLeave={handleShopNavLeave}
                >
                  SHOP
                </li>
                <li>STYLEING</li>
              </ul>
            </div>
          </div>
          <div className="header_logo">
            <Link to="/">
              <img src="/images/logo1.png" alt="mainLogo" />
            </Link>
          </div>
          {isLoggedIn ? (
            <MemberNav handleLogout={handleLogout} />
          ) : (
            <GuestNav />
          )}
        </div>
        {isShopNavVisible && (
          <ShopNav
            onMouseEnter={handleShopNavEnter}
            onMouseLeave={handleShopNavLeave}
          />
        )}
      </div>
    </header>
  );
};

export default MainHeader;
