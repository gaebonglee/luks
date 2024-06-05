import React from "react";
import { Routes, Route } from "react-router-dom";
import MypageMenu from "../components/mypage/pages/MypageMenu";
import MypageMain from "../components/mypage/pages/MypageMain";
import MyOrderList from "../components/mypage/pages/MyOrderList";
import MyOrderDetail from "../components/mypage/pages/MyOrderDetail";
import MyWishList from "../components/mypage/pages/MyWishList";
import "../style/mypage/Mypage.scss";
const Mypage = () => {
  return (
    <div className="Mypage">
      <MypageMenu />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="my-order/list" element={<MyOrderList />} />
        <Route path="my-order/detail" element={<MyOrderDetail />} />
        <Route path="mywish" element={<MyWishList />} />
      </Routes>
    </div>
  );
};

export default Mypage;
