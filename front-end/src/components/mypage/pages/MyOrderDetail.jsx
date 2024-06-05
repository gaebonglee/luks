import React from "react";
import MyOrderProduct from "../myorder/MyOrderProduct";
import BuyerInfo from "../myorder/BuyerInfo";
import MyOrderPaymentInfo from "../myorder/MyOrderPaymentInfo";
import MyOrderShippingInfo from "../myorder/MyOrderShippingInfo";
import "../../../style/myorder/MyOrder.scss";

const MyOrder = () => {
  return (
    <div className="MyOrderPage">
      <MyOrderProduct />
      <BuyerInfo />
      <MyOrderPaymentInfo />
      <MyOrderShippingInfo />
    </div>
  );
};

export default MyOrder;
