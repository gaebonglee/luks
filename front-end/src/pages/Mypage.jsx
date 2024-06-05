import React from "react";
import { Routes, Route } from "react-router-dom";
import MypageMenu from "../components/mypage/pages/MypageMenu";
import MypageMain from "../components/mypage/pages/MypageMain";
import MyOrder from "../components/mypage/pages/MyOrder";
import MyWishList from "../components/mypage/pages/MyWishList";
const Mypage = () => {
  return (
    <div className="Mypage">
      <MypageMenu />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="/my-order/detail" element={<MyOrder />} />
        <Route path="mywish" element={<MyWishList />} />
      </Routes>
    </div>
  );
};

export default Mypage;
