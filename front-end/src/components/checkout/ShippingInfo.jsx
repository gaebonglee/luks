import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/checkout/ShippingInfo.scss";

const ShippingInfo = () => {
  const [memberInfo, setMemberInfo] = useState({
    member_name: "",
    phonenumber: "",
    postcode: "",
    basic_address: "",
    detail_address: "",     
  });

  const handlePostcodeChange = (e) => {
    setMemberInfo((prevState) => ({
      ...prevState,
      postcode: e.target.value,
    }));
  };

  const handleBasicAddressChange = (e) => {
    setMemberInfo((prevState) => ({
      ...prevState,
      basic_address: e.target.value,
    }));
  };

  const handleDetailAddressChange = (e) => {
    setMemberInfo((prevState) => ({
      ...prevState,
      detail_address: e.target.value,
    }));
  };

  //다음 주소찾기
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        handlePostcodeChange({ target: { value: data.zonecode } });
        handleBasicAddressChange({ target: { value: addr } });
        document.getElementById("sample6_detailAddress").focus();
      },
    }).open();
  };

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/member/info", {
          withCredentials: true,
        });
        if (response.data.success) {
          setMemberInfo(response.data.member);
        } else {
          console.error("Failed to fetch member info:", response.data.message);
        }
      } catch (error) {
        console.error("There was an error fetching the member info!", error);
        console.error(
          "Error details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchMemberInfo();
  }, []);

  return (
    <section className="shipping_section">
      <div className="shipping_wrap">
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <h2>배송 정보</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">배송지명</th>
              <td className="input_td">
                <input
                  className="inputTypeText short-input"
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
                  className="inputTypeText short-input"
                  type="text"
                  placeholder="최대 10자"
                  maxLength={10}
                  value={memberInfo.member_name}
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
                    value={memberInfo.postcode}
                    readOnly
                  />
                  <input
                    type="button"
                    onClick={openPostcode}
                    value="주소검색"
                  />
                </div>
                <input
                  type="text"
                  id="sample6_address"
                  name="basic_address"
                  placeholder="기본주소"
                  value={memberInfo.basic_address}
                  readOnly
                />
                <input
                  type="text"
                  id="sample6_detailAddress"
                  name="detail_address"
                  placeholder="상세주소 (선택 입력 가능)"
                  value={memberInfo.detail_address}
                  onChange={handleDetailAddressChange}
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
                  value={memberInfo.phonenumber}
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
