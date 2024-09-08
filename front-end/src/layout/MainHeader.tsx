import React, { useState, useEffect } from "react";
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
                  onMouseEnter={() => setIsShopNavVisible(true)} 
                  onMouseLeave={() => setIsShopNavVisible(false)} 
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
        {isShopNavVisible && <ShopNav />}
      </div>
    </header>
  );
};

export default MainHeader;
