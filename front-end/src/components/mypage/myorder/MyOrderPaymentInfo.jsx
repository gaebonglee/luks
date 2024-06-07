import React from "react";
import "../../../style/myorder/MyOrderPaymentInfo.scss";

const MyOrderPaymentInfo = ({ order }) => {
  const totalAmount = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const paymentMethod = order[0].payment_method;

  return (
    <section className="MyOrderPaymentInfo_section">
      <h3>결제정보</h3>
      <div className="order_pay">
        <ul className="payment_order">
          <li className="pay_total">
            <div className="left">주문금액</div>
            <div className="right">
              <span className="right num">{totalAmount.toLocaleString()}</span>
              <span>원</span>
            </div>
          </li>
          <li className="pay_total_detail">
            <div className="left">상품금액</div>
            <div className="right">
              <span className="right num">{totalAmount.toLocaleString()}</span>
              <span>원</span>
            </div>
          </li>
        </ul>
        <ul className="payment_deduct">
          <li className="pay_total">
            <div className="left">할인금액</div>
            <div className="right">
              <span className="right num">0</span>
              <span>원</span>
            </div>
          </li>
        </ul>
        <ul className="payment_total">
          <li className="pay_total">
            <div className="left">주문금액</div>
            <div className="right">
              <span className="right num">{totalAmount.toLocaleString()}</span>
              <span>원</span>
            </div>
          </li>
          <li className="pay_total_detail">
            <div className="left">결제방법</div>
            <div className="right">
              <span className="right num">{paymentMethod}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MyOrderPaymentInfo;
