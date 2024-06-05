import React from "react";
import "../../../style/myorder/MyOrderShippingInfo.scss";

const MyOrderShippingInfo = () => {
  return (
    <section className="MyOrderShippingInfo_section">
      <h3>배송지정보</h3>
      <div className="MyOrderShippingInfo_wrap">
        <table className="MyOrderShippingInfo_table">
          <tbody>
            <tr>
              <td className="title">주문자</td>
              <td className="field">이름름</td>
              <td className="title right">휴대폰번호</td>
              <td className="field">휴대폰번호호</td>
            </tr>
            <tr>
              <td className="title">전화번호</td>
              <td className="field" colSpan="3">
                -
              </td>
            </tr>
            <tr>
              <td className="title">주소</td>
              <td className="field" colSpan="3">-</td>
            </tr>
            <tr>
              <td className="title">배송요청사항</td>
              <td className="field" colSpan="3">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrderShippingInfo;
