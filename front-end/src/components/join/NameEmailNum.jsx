import React, { useState } from "react";

const NameEmailNum = ({
  memberName,
  memberEmail,
  memberMobileNum,
  handleNameChange,
  handleEmailChange,
  handleMobileNumChange,
  emailValid,
}) => {
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailDuplicate = async (email) => {
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

  const onChangeEmail = (e) => {
    const value = e.target.value;
    handleEmailChange(value, validateEmail(value));
    if (validateEmail(value)) {
      checkEmailDuplicate(value);
    } else {
      setIsDuplicateEmail(false);
    }
  };

  const onChangeMobileNum = (e) => {
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
            {emailValid && !isDuplicateEmail}
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">휴대전화</th>
        <td className="input_td">
          <input
            id="member_mobile_num"
            name="member_mobile_num"
            maxLength="11"
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
