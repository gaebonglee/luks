import React from "react";
import "../../../style/myorder/BuyerInfo.scss";

const BuyerInfo = () => {
  return (
    <section className="BuyerInfo_section">
      <h3>구매자정보</h3>
      <div className="BuyerInfo_wrap">
        <table className="BuyerInfo_table">
          <tbody>
            <tr>
              <td className="title">주문자</td>
              <td className="field">이름름</td>
              <td className="title right">이메일주소</td>
              <td className="field">주소소</td>
            </tr>
            <tr>
              <td className="title">전화번호</td>
              <td className="field">-</td>
              <td className="title right">휴대폰번호</td>
              <td className="field">휴대폰번호호</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BuyerInfo;
