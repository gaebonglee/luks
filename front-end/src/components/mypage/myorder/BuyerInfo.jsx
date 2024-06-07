import React from "react";
import "../../../style/myorder/BuyerInfo.scss";

const BuyerInfo = ({ buyerInfo }) => {
  return (
    <section className="BuyerInfo_section">
      <h3>구매자정보</h3>
      <div className="BuyerInfo_wrap">
        <table className="BuyerInfo_table">
          <tbody>
            <tr>
              <td className="title">주문자</td>
              <td className="field">{buyerInfo.member_name}</td>
              <td className="title right">이메일주소</td>
              <td className="field">{buyerInfo.email}</td>
            </tr>
            <tr>
              <td className="title">전화번호</td>
              <td className="field">-</td>
              <td className="title right">휴대폰번호</td>
              <td className="field">{buyerInfo.phonenumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BuyerInfo;
