import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../style/mypage/MypageMenu.scss";
import axios from "axios";

const MypageMenu = () => {
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    const fetchMemberName = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mypage", {
          withCredentials: true,
        });
        setMemberName(response.data.member.member_name);
      } catch (error) {
        console.error("Failed to fetch member name", error);
      }
    };

    fetchMemberName();
  }, []);

  return (
    <section className="left_section">
      <div className="mypageMenu_wrap">
        <div className="mypageMenu_top">
          <p>{memberName}님</p>
        </div>
        <div className="mypageMenu_bottom">
          <div className="myOrder">
            <p>쇼핑 정보</p>
            <ul>
              <li>
                <NavLink
                  to="/mypage/order"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  주문조회
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mypage/review"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  상품 리뷰
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="myActivity">
            <p>활동 정보</p>
            <ul>
              <li>
                <NavLink
                  to="/mypage/mywish"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  나의 위시리스트
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="myInfo">
            <p>나의 정보</p>
            <ul>
              <li>
                <NavLink
                  to="/mypage/memberinfo"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  회원 정보수정
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MypageMenu;
