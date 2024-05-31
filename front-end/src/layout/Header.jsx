import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderMenu from "./HeaderMenu";
import GuestNav from "./GuestNav";
import MemberNav from "./MemberNav";
import "../style/layout/Header.scss";
import Swal from "sweetalert2";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/check-session", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Session check error:", error);
      });
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
          <div className="header_logo">
            <Link to="/">
              <img src="/images/luks_logo.jpg" alt="mainLogo" />
            </Link>
          </div>
          {isLoggedIn ? (
            <MemberNav handleLogout={handleLogout} />
          ) : (
            <GuestNav />
          )}
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
