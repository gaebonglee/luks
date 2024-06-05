import React from "react";
import MyOrderProduct from "../components/myorder/MyOrderProduct";
import "../style/myorder/MyOrder.scss";

const MyOrder = () => {
  return (
    <div className="MyOrderPage">
      <MyOrderProduct />
    </div>
  );
};

export default MyOrder;
