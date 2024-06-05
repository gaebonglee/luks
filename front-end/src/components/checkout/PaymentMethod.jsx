import React, { useState } from "react";
import "../../style/checkout/PaymentMethod.scss";

const PaymentMethod = ({ onMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [methodInfo, setMethodInfo] = useState("결제 방법을 선택해주세요");

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onMethodChange(method);
    switch (method) {
      case "카드결제":
        setMethodInfo("신용/체크카드 안내");
        break;
      case "네이버페이":
        setMethodInfo("네이버페이 안내");
        break;
      case "카카오페이":
        setMethodInfo("카카오페이 안내");
        break;
      case "무통장입금":
        setMethodInfo("무통장입금 안내");
        break;
      default:
        setMethodInfo("결제 방법을 선택해주세요");
    }
  };

  return (
    <section className="paymentMethod_section">
      <div className="paymentMethod_wrap">
        <div className="paymentMethod_title">
          <a>결제방법</a>
        </div>
        <div className="paymentMethod_container">
          <div className="paymentMethod_info">
            <button>{methodInfo}</button>
          </div>
          <ul className="paymentMethod_flex">
            <li>
              <button onClick={() => handleMethodChange("카드결제")}>
                신용/체크카드
              </button>
            </li>
            <li>
              <button onClick={() => handleMethodChange("네이버페이")}>
                네이버페이
              </button>
            </li>
            <li>
              <button onClick={() => handleMethodChange("카카오페이")}>
                카카오페이
              </button>
            </li>
            <li>
              <button onClick={() => handleMethodChange("무통장입금")}>
                무통장입금
              </button>
            </li>
          </ul>
          {selectedMethod === "card" && (
            <div className="paymentMethod_option">
              <div className="paymentMethod_option row">
                <select>
                  <option value="">카드사를 선택해주세요</option>
                  <option value="shinhan">신한카드</option>
                  <option value="kookmin">국민카드</option>
                  <option value="woori">우리카드</option>
                </select>
              </div>
            </div>
          )}
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
