import React from "react";
import { useLocation } from "react-router-dom";
import PaymentInfo from "../components/checkout/PaymentInfo";
import ShippingInfo from "../components/checkout/ShippingInfo";
import CheckProductInfo from "../components/checkout/CheckProductInfo";
import PaymentMethod from "../components/checkout/PaymentMethod";
import "../style/checkout/Checkout.scss";

//아이콘

const Checkout = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedProductDetails || [];

  // 총 결제 금액 계산
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.p_price * item.quantity,
    0
  );

  return (
    <section className="checkout_section">
      <div className="checkout_container">
        <div className="bagAndOrder_title">
          <ul>
            <li>
              <a>01 SHOPPING BAG</a>
            </li>
            <li>
              <a>02 ORDER</a>
            </li>
            <li>
              <a>01 ORDER CONFIRMED</a>
            </li>
          </ul>
        </div>
        <div className="checkout_wrap">
          <div className="shippingInfo_container">
            <ShippingInfo />
            <CheckProductInfo selectedItems={selectedItems} />
            <PaymentMethod />
          </div>
          <div className="paymentInfo_container">
            <PaymentInfo totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
