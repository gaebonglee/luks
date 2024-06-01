import React from "react";
import { Routes, Route } from "react-router-dom";
import MypageMenu from "../components/mypage/MypageMenu";
import MypageMain from "../components/mypage/MypageMain";
import MyOrder from "../components/mypage/myorder/MyOrder";
import MyWishList from "../components/mypage/mywish/MyWishList";
const Mypage = () => {
  return (
    <div className="Mypage">
      <MypageMenu />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="order" element={<MyOrder />} />
        <Route path="mywish" element={<MyWishList />} />
      </Routes>
    </div>
  );
};

export default Mypage;
