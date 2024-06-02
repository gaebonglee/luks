import React from "react";
import "../../style/checkout/ShippingInfo.scss";

const ShippingInfo = () => {
  return (
    <section className="shipping_section">
      <div className="shipping_wrap">
        <table>
          <thead>
            <h2>배송 정보</h2>
          </thead>
          <tbody>
            <tr>
              <th scope="row">배송지명</th>
              <td className="input_td">
                <input
                  className="inputTypeText"
                  type="text"
                  placeholder="최대 10자"
                  maxLength={10}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">수령인</th>
              <td className="input_td">
                <input
                  id="member_name"
                  name="member_name"
                  className="inputTypeText"
                  type="text"
                  placeholder="최대 10자"
                  maxLength={10}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">주소</th>
              <td className="input_td AddressWrap">
                <div className="postWrap">
                  <input
                    type="text"
                    id="sample6_postcode"
                    name="postcode"
                    placeholder="우편번호"
                    readOnly
                  />
                  <input type="button" value="주소검색" />
                </div>

                <input
                  type="text"
                  id="sample6_address"
                  name="basic_address"
                  placeholder="기본주소"
                  readOnly
                />

                <input
                  type="text"
                  id="sample6_detailAddress"
                  name="detail_address"
                  placeholder="상세주소 (선택 입력 가능)"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">연락처</th>
              <td className="input_td">
                <input
                  id="member_mobile_num"
                  name="member_mobile_num"
                  maxLength="11"
                  type="text"
                  placeholder=" '-'를 제외하고 입력해주세요"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">배송 요청사항</th>
              <td className="input_td">
                <input maxLength="50" type="text" placeholder="최대 50자" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ShippingInfo;
