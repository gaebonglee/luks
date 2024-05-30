import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderMenu from "./HeaderMenu";
import "../style/layout/Header.scss";

//아이콘
import { FaRegUser, FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  }, []);

  const handleLogin = async (member_id, member_pw) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { member_id, member_pw },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        Swal.fire({
          icon: "success",
          title: "로그인 완료",
          text: "로그인이 완료되었습니다.",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "아이디와 비밀번호를 다시 확인해주세요.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "서버 오류",
        text: "서버와의 통신 중 문제가 발생했습니다.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoggedIn(false);
        Swal.fire({
          icon: "success",
          title: "로그아웃 완료",
          text: "로그아웃이 완료되었습니다.",
        }).then(() => {
          navigate("/");
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
          <div className="header_user">
            <div className="header_member">
              <Link to={isLoggedIn ? "/" : "/login"}>
                <FaRegUser />
                <p>my page</p>
              </Link>
            </div>
            <div className="header_like">
              <Link to={isLoggedIn ? "/" : "/login"}>
                <FaHeart />
                <p>my wish</p>
              </Link>
            </div>
            <div className="header_mybag">
              <Link to={isLoggedIn ? "/" : "/login"}>
                <IoBag />
                <p>my bag</p>
              </Link>
            </div>
            <div className="header_log">
              <Link
                to={isLoggedIn ? "/" : "/login"}
                onClick={isLoggedIn ? handleLogout : null}
              >
                {isLoggedIn ? (
                  <>
                    <RiLogoutBoxFill />
                    <p>logout</p>
                  </>
                ) : (
                  <>
                    <RiLoginBoxFill />
                    <p>login</p>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
