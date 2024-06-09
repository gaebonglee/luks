import React from "react";
import { Routes, Route } from "react-router-dom";
import MypageMenu from "../components/mypage/pages/MypageMenu";
import MypageMain from "../components/mypage/pages/MypageMain";
import MyOrderList from "../components/mypage/pages/MyOrderList";
import MyOrderDetail from "../components/mypage/pages/MyOrderDetail";
import ReviewList from "../components/mypage/review/ReviewList";
import MyWishList from "../components/mypage/pages/MyWishList";
import MyInfo from "../components/mypage/pages/MyInfo";
import Mymodify from "../components/mypage/myinfo/Mymodify";

import "../style/mypage/Mypage.scss";
const Mypage = () => {
  return (
    <div className="Mypage">
      <MypageMenu />
      <Routes>
        <Route path="/" element={<MypageMain />} />
        <Route path="my-order/list" element={<MyOrderList />} />
        <Route path="my-order/detail" element={<MyOrderDetail />} />
        <Route path="review/list" element={<ReviewList />} />
        <Route path="mywish" element={<MyWishList />} />
        <Route path="edit/reconfirm" element={<MyInfo />} />
        <Route path="edit/info" element={<Mymodify />} />
      </Routes>
    </div>
  );
};

export default Mypage;
