import React from "react";
import "../../style/checkout/PaymentMethod.scss";

const PaymentMethod = () => {
  return (
    <section className="paymentMethod_section">
      <div className="paymentMethod_wrap">
        <div className="paymentMethod_title">
          <a>결제방법</a>
        </div>
        <div className="paymentMethod_container">
          <div className="paymentMethod_info">
            <button>신용/체크카드 안내</button>
          </div>
          <ul className="paymentMethod_flex">
            <li>
              <button>신용/체크카드</button>
            </li>
            <li>
              <button>네이버페이</button>
            </li>
            <li>
              <button>카카오페이</button>
            </li>
            <li>
              <button>무통장입금</button>
            </li>
          </ul>
          <div className="paymentMethod_option">
            <div className="paymentMethod_option row">
              <option value={"카드사를 선택해주세요"}></option>
            </div>
          </div>
          <ul className="paymentMethod_eventWrap">
            <li>
              <button>
                <span>혜택</span>
                <a>혜택들</a>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethod;
