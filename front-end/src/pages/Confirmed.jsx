import React from "react";
import { useLocation } from "react-router-dom";
import ProductConfirm from "../components/confirmed/ProductConfirm";
import PaymentConfirm from "../components/confirmed/PaymentConfirm";
import ShippingConfirm from "../components/confirmed/ShippingConfirm";
import "../style/confirm/Confirmed.scss";

//아이콘
import { IoMdArrowDropright } from "react-icons/io";

const Confirmed = () => {
  const location = useLocation();
  const { selectedItems, paymentMethod, shippingInfo, totalAmount } =
    location.state || {};

  return (
    <div className="Confirmed_container">
      <div className="bagAndOrder_title">
        <ul>
          <li>
            <a>SHOPPING BAG</a>
            <IoMdArrowDropright />
          </li>
          <li>
            <a>ORDER</a>
            <IoMdArrowDropright />
          </li>
          <li>
            <a className="changeColor">ORDER CONFIRMED</a>
          </li>
        </ul>
      </div>
      <ProductConfirm selectedItems={selectedItems} />
      <PaymentConfirm paymentMethod={paymentMethod} totalAmount={totalAmount} />
      <ShippingConfirm shippingInfo={shippingInfo} />
      <div className="Confirmed_btnWrap">
        <button className="left">
          <a href="/">계속 쇼핑하기</a>
        </button>
        <button className="right">
          <a href="mypage/my-order/list">주문/배송조회</a>
        </button>
      </div>
    </div>
  );
};

export default Confirmed;
