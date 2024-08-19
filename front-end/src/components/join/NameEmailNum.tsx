import React, { useState } from "react";

interface NameEmailNumProps {
  memberName: string;
  memberEmail: string;
  memberMobileNum: string;
  handleNameChange: (memberName: string) => void;
  handleEmailChange: (memberEmail: string, isValid: boolean) => void;
  handleMobileNumChange: (memberMobileNum: string) => void;
  emailValid: boolean;
}

const NameEmailNum: React.FC<NameEmailNumProps> = ({
  memberName,
  memberEmail,
  memberMobileNum,
  handleNameChange,
  handleEmailChange,
  handleMobileNumChange,
  emailValid,
}) => {
  const [isDuplicateEmail, setIsDuplicateEmail] = useState<boolean>(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 중복 체크 함수
  const checkEmailDuplicate = async (email: string) => {
    try {
      const response = await fetch("http://localhost:5000/join/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.status === 409) {
        setIsDuplicateEmail(true);
      } else {
        setIsDuplicateEmail(false);
      }
    } catch (error) {
      console.error("Error checking email duplicate:", error);
      setIsDuplicateEmail(false);
    }
  };

  // 이메일 변경 시 호출되는 함수
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = validateEmail(value);
    handleEmailChange(value, isValid);

    if (isValid) {
      checkEmailDuplicate(value);
    } else {
      setIsDuplicateEmail(false);
    }
  };

  // 휴대전화 변경 시 호출되는 함수
  const onChangeMobileNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    handleMobileNumChange(value);
  };

  return (
    <>
      <tr>
        <th scope="row">이름</th>
        <td className="input_td">
          <input
            id="member_name"
            name="member_name"
            className="inputTypeText"
            type="text"
            value={memberName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <th scope="row">이메일</th>
        <td className="input_td">
          <input
            id="member_email"
            name="member_email"
            className="inputTypeText"
            type="text"
            value={memberEmail}
            onChange={onChangeEmail}
          />
        </td>
        <td className="join_guide">
          <div className="conditionWrap">
            {memberEmail && !emailValid && (
              <span className="warning">유효한 이메일을 입력하세요.</span>
            )}
            {isDuplicateEmail && (
              <span className="warning">
                "{memberEmail}"는 중복된 이메일입니다.
              </span>
            )}
            {emailValid && !isDuplicateEmail && (
              <span>사용 가능한 이메일입니다.</span>
            )}
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">휴대전화</th>
        <td className="input_td">
          <input
            id="member_mobile_num"
            name="member_mobile_num"
            maxLength={11}
            type="text"
            value={memberMobileNum}
            onChange={onChangeMobileNum}
          />
        </td>
        <td className="join_guide">
          <div className="conditionWrap">
            <span>"-"를 제외하고 입력해주세요. ( 예시 : 01012341234 )</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NameEmailNum;
