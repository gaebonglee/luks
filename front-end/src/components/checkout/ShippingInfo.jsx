import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/checkout/ShippingInfo.scss";

const ShippingInfo = ({ onChange }) => {
  const [memberInfo, setMemberInfo] = useState({
    address_name: "",
    recipient_name: "",
    phonenumber: "",
    postcode: "",
    basic_address: "",
    detail_address: "",
    request: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/member/info", {
          withCredentials: true,
        });
        if (response.data.success) {
          const member = response.data.member;
          setMemberInfo((prevState) => ({
            ...prevState,
            recipient_name: member.member_name,
            phonenumber: member.phonenumber,
            postcode: member.postcode,
            basic_address: member.basic_address,
            detail_address: member.detail_address,
          }));
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

  useEffect(() => {
    onChange(memberInfo); // Call onChange prop whenever memberInfo changes
  }, [memberInfo, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        handleChange({ target: { name: "postcode", value: data.zonecode } });
        handleChange({ target: { name: "basic_address", value: addr } });
        document.getElementById("sample6_detailAddress").focus();
      },
    }).open();
  };

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
                  name="address_name"
                  value={memberInfo.address_name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">수령인</th>
              <td className="input_td">
                <input
                  id="recipient_name"
                  name="recipient_name"
                  className="inputTypeText short-input"
                  type="text"
                  placeholder="최대 10자"
                  maxLength={10}
                  value={memberInfo.recipient_name}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">연락처</th>
              <td className="input_td">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  maxLength="11"
                  type="text"
                  placeholder=" '-'를 제외하고 입력해주세요"
                  value={memberInfo.phonenumber}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">배송 요청사항</th>
              <td className="input_td">
                <input
                  name="request"
                  maxLength="50"
                  type="text"
                  placeholder="최대 50자"
                  value={memberInfo.request}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ShippingInfo;
