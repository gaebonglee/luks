import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../style/mypage/MypageMain.scss";
import RecentOrders from "../main/RecentOrders";
import MyHeart from "../main/MyHeart";

const MypageMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <section className="right_section">
      <div className="MypageMain">
        <RecentOrders />
        <MyHeart />
      </div>
    </section>
  );
};

export default MypageMain;
