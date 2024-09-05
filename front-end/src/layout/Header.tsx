import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GuestNav from "./GuestNav";
import MemberNav from "./MemberNav";
import "../style/layout/Header.scss";
import Swal from "sweetalert2";
import { checkSession } from "../types/checkSession"; // checkSession 함수 가져오기

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      const loggedIn = await checkSession(); // 세션 체크 함수 호출
      setIsLoggedIn(loggedIn);
    };

    verifySession();
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
              <img src="/images/logo1.png" alt="mainLogo" />
            </Link>
          </div>
          {isLoggedIn ? (
            <MemberNav handleLogout={handleLogout} />
          ) : (
            <GuestNav />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
