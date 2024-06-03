import React from "react";
import "../../style/confirm/PaymentConfirm.scss";

const PaymentConfirm = () => {
  return (
    <section className="PaymentConfirm_section">
      <h3>결제정보</h3>
      <div className="PaymentConfirm_wrap">
        <table className="PaymentConfirm_table">
          <tbody>
            <tr>
              <th>결제방법</th>
              <td>무통장입금</td>
            </tr>
            <tr>
              <th>주문상태</th>
              <td>결제완료</td>
            </tr>
            <tr>
              <th>주문접수일시</th>
              <td>시간</td>
            </tr>
            <tr>
              <th>결제완료일시</th>
              <td>시간</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td>금액</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        결제 및 계좌 안내 시 상호명이 <strong>luks</strong>로 표기되니 참고 부탁드립니다.
      </p>
    </section>
  );
};

export default PaymentConfirm;
