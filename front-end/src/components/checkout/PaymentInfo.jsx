import React from "react";
import "../../style/checkout/PaymentInfo.scss";

const PaymentInfo = ({ totalAmount, onCheckout }) => {
  return (
    <section className="payment_section">
      <div className="payment_title">
        <h2>결제금액</h2>
      </div>
      <div>
        <ul className="payment_ul">
          <li>
            <div className="totalAmount_wrap">
              <span className="totalAmount_left">총 결제 금액</span>
              <span className="totalAmount_right">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </li>
        </ul>
        <div className="payment_AgreeWrap">
          <div className="payment_allAgree">
            <span>
              <input type="checkbox"></input>
              <a>주문내용을 확인했으며, 아래 내용을 모두 동의합니다.</a>
            </span>
          </div>
          <ul>
            <li>
              <input type="checkbox"></input>
              <a> (필수) 개인정보 수집/이용 동의</a>
            </li>
            <li>
              <input type="checkbox"></input>
              <a> (필수) 개인정보 제3자 제공 동의</a>
            </li>
          </ul>
          <p>
            결제 및 계좌 안내 시 상호명은 <strong>luks</strong>로 표기됩니다.
          </p>
        </div>
        <div className="checkoutBtn">
          <button onClick={onCheckout}>CHECK OUT</button>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
