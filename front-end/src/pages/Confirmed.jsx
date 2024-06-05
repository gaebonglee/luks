import React from "react";
import ProductConfirm from "../components/confirmed/ProductConfirm";
import PaymentConfirm from "../components/confirmed/PaymentConfirm";
import ShippingConfirm from "../components/confirmed/ShippingConfirm";
import "../style/confirm/Confirmed.scss";

const Confirmed = () => {
  return (
    <div className="Confirmed_container">
      <div className="bagAndOrder_title">
        <ul>
          <li>
            <a>01 SHOPPING BAG</a>
          </li>
          <li>
            <a>02 ORDER</a>
          </li>
          <li>
            <a>03 ORDER CONFIRMED</a>
          </li>
        </ul>
      </div>
      <ProductConfirm />
      <PaymentConfirm />
      <ShippingConfirm />
      <div className="Confirmed_btnWrap">
        <button className="left"><a>계속 쇼핑하기</a></button>
        <button className="right"><a>주문/배송조회</a></button>
      </div>
    </div>
  );
};

export default Confirmed;
