import React, { useEffect } from "react";

interface JoinAddressProps {
  postcode: string;
  basicAddress: string;
  detailAddress: string;
  handlePostcodeChange: (postcode: string) => void;
  handleBasicAddressChange: (basicAddress: string) => void;
  handleDetailAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinAddress: React.FC<JoinAddressProps> = ({
  postcode,
  basicAddress,
  detailAddress,
  handlePostcodeChange,
  handleBasicAddressChange,
  handleDetailAddressChange,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode API loaded");
    };
    document.head.appendChild(script);
  }, []);

  const openPostcode = () => {
    if ((window as any).daum && (window as any).daum.Postcode) {
      new (window as any).daum.Postcode({
        oncomplete: function (data: any) {
          let addr =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;

          // 여기서 상태를 직접 업데이트
          handlePostcodeChange(data.zonecode);
          handleBasicAddressChange(addr);

          document.getElementById("sample6_detailAddress")?.focus();
        },
      }).open();
    } else {
      console.error("Daum Postcode API is not loaded yet.");
    }
  };

  return (
    <>
      <tr>
        <th scope="row">주소</th>
        <td className="input_td AddressWrap">
          <div className="postWrap">
            <input
              type="text"
              id="sample6_postcode"
              name="postcode"
              placeholder="우편번호"
              value={postcode}
              readOnly
            />
            <input type="button" onClick={openPostcode} value="주소검색" />
          </div>

          <input
            type="text"
            id="sample6_address"
            name="basic_address"
            placeholder="기본주소"
            value={basicAddress}
            readOnly
          />

          <input
            type="text"
            id="sample6_detailAddress"
            name="detail_address"
            placeholder="상세주소 (선택 입력 가능)"
            value={detailAddress}
            onChange={handleDetailAddressChange}
          />
        </td>
      </tr>
    </>
  );
};

export default JoinAddress;
