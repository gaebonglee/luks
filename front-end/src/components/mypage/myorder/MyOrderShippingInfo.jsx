import React from "react";
import "../../../style/myorder/MyOrderShippingInfo.scss";

const MyOrderShippingInfo = ({ shippingInfo }) => {
  return (
    <section className="MyOrderShippingInfo_section">
      <h3>배송지정보</h3>
      <div className="MyOrderShippingInfo_wrap">
        <table className="MyOrderShippingInfo_table">
          <tbody>
            <tr>
              <td className="title">
                <a>받는사람</a>
              </td>
              <td className="field">{shippingInfo.recipient_name}</td>
              <td className="title right">
                <a>휴대폰번호</a>
              </td>
              <td className="field">{shippingInfo.phone_number}</td>
            </tr>
            <tr>
              <td className="title">
                <a>전화번호</a>
              </td>
              <td className="field" colSpan="3">
                {shippingInfo.phone_number}
              </td>
            </tr>
            <tr>
              <td className="title">
                <a>주소</a>
              </td>
              <td className="field" colSpan="3">
                {shippingInfo.address} {shippingInfo.detail_address}
              </td>
            </tr>
            <tr>
              <td className="title">
                <a>배송요청사항</a>
              </td>
              <td className="field" colSpan="3">
                {shippingInfo.request}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrderShippingInfo;
