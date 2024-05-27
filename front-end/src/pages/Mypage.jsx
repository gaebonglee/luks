import React from "react";
import { Routes, Route } from "react-router-dom";
import MypageMenu from "../components/mypage/MypageMenu";
import MypageMain from "../components/mypage/MypageMain";
import MyOrder from "../components/mypage/myorder/MyOrder";
import "../style/mypage/Mypage.scss";

const Mypage = () => {
  return (
    <div className="Mypage">
      <MypageMenu />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="order" element={<MyOrder />} />
        {/* 추가적인 경로도 여기에 정의할 수 있습니다 */}
      </Routes>
    </div>
  );
};

export default Mypage;
