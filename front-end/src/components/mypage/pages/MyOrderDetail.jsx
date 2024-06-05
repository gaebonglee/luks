import React from "react";
import MyOrderProduct from "../myorder/MyOrderProduct";
import BuyerInfo from "../myorder/BuyerInfo";
import MyOrderPaymentInfo from "../myorder/MyOrderPaymentInfo";
import MyOrderShippingInfo from "../myorder/MyOrderShippingInfo";

const MyOrder = () => {
  return (
    <section className="right_section">
      <div className="MyOrderPage">
        <MyOrderProduct />
        <BuyerInfo />
        <MyOrderPaymentInfo />
        <MyOrderShippingInfo />
      </div>
    </section>
  );
};

export default MyOrder;
