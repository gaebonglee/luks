import React, { useRef, useEffect, useState } from "react";

// Props 타입 정의
interface JoinAddressProps {
  postcode: string;
  basicAddress: string;
  detailAddress: string;
  handlePostcodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBasicAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AddressFormData {
  postcode: string;
  basicAddress: string;
}

const JoinAddress: React.FC<JoinAddressProps> = ({
  postcode,
  basicAddress,
  detailAddress,
  handlePostcodeChange,
  handleBasicAddressChange,
  handleDetailAddressChange,
}) => {
  const detailAddressRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    postcode: "",
    basicAddress: "",
  });

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

  // 우편번호 찾기 API 호출 함수
  const openPostcode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          let addr = ""; // 주소 변수

          // 사용자가 도로명 주소를 선택했을 때
          if (data.userSelectedType === "R") {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          // 우편번호와 주소를 부모 컴포넌트로 전달
          const handlePostcodeChange = (
            e:
              | React.ChangeEvent<HTMLInputElement>
              | { target: { value: string } }
          ) => {
            if ("target" in e && e.target instanceof HTMLInputElement) {
              setFormData({ ...formData, postcode: e.target.value });
            } else {
              // Daum API로부터 온 값 처리
              setFormData({ ...formData, postcode: e.target.value });
            }
          };
          const handleBasicAddressChange = (
            e:
              | React.ChangeEvent<HTMLInputElement>
              | { target: { value: string } }
          ) => {
            if ("target" in e && e.target instanceof HTMLInputElement) {
              setFormData({ ...formData, basicAddress: e.target.value });
            } else {
              // Daum API로부터 온 값 처리
              setFormData({ ...formData, basicAddress: e.target.value });
            }
          };
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
