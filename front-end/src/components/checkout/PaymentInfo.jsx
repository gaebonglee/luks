import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // SweetAlert2 추가
import "../../style/checkout/PaymentInfo.scss";

const PaymentInfo = ({ totalAmount, onCheckout }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    thirdPartyConsentInfo: false,
  });

  useEffect(() => {
    // 모든 개별 체크박스가 체크되면 전체 체크박스도 체크
    if (agreements.personalInfo && agreements.thirdPartyConsentInfo) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [agreements]);

  const handleAllCheck = () => {
    const newCheckState = !allChecked;
    setAllChecked(newCheckState);
    setAgreements({
      personalInfo: newCheckState,
      thirdPartyConsentInfo: newCheckState,
    });
  };

  const handleSingleCheck = (e) => {
    const { name, checked } = e.target;
    setAgreements((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleCheckoutClick = () => {
    // 필수사항 동의 체크 확인
    if (!agreements.personalInfo || !agreements.thirdPartyConsentInfo) {
      Swal.fire("필수사항에 동의해주세요.");
      return;
    }

    // 모든 조건이 충족되면 onCheckout 호출
    onCheckout();
  };

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
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
              />
              <a>주문내용을 확인했으며, 아래 내용을 모두 동의합니다.</a>
            </span>
          </div>
          <ul>
            <li>
              <input
                type="checkbox"
                name="personalInfo"
                checked={agreements.personalInfo}
                onChange={handleSingleCheck}
              />
              <a> (필수) 개인정보 수집/이용 동의</a>
            </li>
            <li>
              <input
                type="checkbox"
                name="thirdPartyConsentInfo"
                checked={agreements.thirdPartyConsentInfo}
                onChange={handleSingleCheck}
              />
              <a> (필수) 개인정보 제3자 제공 동의</a>
            </li>
          </ul>
          <p>
            결제 및 계좌 안내 시 상호명은 <strong>luks</strong>로 표기됩니다.
          </p>
        </div>
        <div className="checkoutBtn">
          <button onClick={handleCheckoutClick}>CHECK OUT</button>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
