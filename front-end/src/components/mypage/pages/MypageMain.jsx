import React from "react";
import "../../../style/mypage/MypageMain.scss";
import RecentOrders from "../main/RecentOrders";
import MyHeart from "../main/MyHeart";

const MypageMain = () => {
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
