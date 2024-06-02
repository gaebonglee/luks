import React from "react";
import PaymentInfo from "../components/checkout/PaymentInfo";
import ShippingInfo from "../components/checkout/ShippingInfo";
import CheckProductInfo from "../components/checkout/CheckProductInfo";
import PaymentMethod from "../components/checkout/PaymentMethod";
import "../style/checkout/Checkout.scss";

//아이콘
import { IoIosArrowForward } from "react-icons/io";

const Checkout = () => {
  return (
    <div className="checkout_container">
      <div className="bagAndOrder_title">
        <ul>
          <li>
            <a>01 SHOPPING BAG</a>
            <IoIosArrowForward />
          </li>
          <li>
            <a>02 ORDER</a>
            <IoIosArrowForward />
          </li>
          <li>
            <a>01 ORDER CONFIRMED</a>
          </li>
        </ul>
      </div>
      <div className="checkout_wrap">
        <div className="shippingInfo_container">
          <ShippingInfo />
          <CheckProductInfo />
          <PaymentMethod />
        </div>
        <div className="paymentInfo_container">
          <PaymentInfo />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
