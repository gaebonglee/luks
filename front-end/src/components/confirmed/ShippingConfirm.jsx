import React from "react";
import "../../style/confirm/ShippingConfirm.scss";

const ShippingConfirm = ({ shippingInfo }) => {
  return (
    <section className="ShippingConfirm_section">
      <h3>배송정보</h3>
      <div className="ShippingConfirm_wrap">
        <table className="ShippingConfirm_table">
          <tbody>
            <tr>
              <th>받으시는 분</th>
              <td>{shippingInfo.recipient_name}</td>
            </tr>
            <tr>
              <th>휴대폰 번호</th>
              <td>{shippingInfo.phonenumber}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                {shippingInfo.basic_address} {shippingInfo.detail_address}
              </td>
            </tr>
            <tr>
              <th>배송요청사항</th>
              <td>{shippingInfo.request}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        결제 및 계좌 안내 시 상호명이 <strong>luks</strong>로 표기되니 참고
        부탁드립니다.
      </p>
    </section>
  );
};

export default ShippingConfirm;
