import React from "react";

const NameEmailNum = ({
  memberName,
  memberEmail,
  memberMobileNum,
  handleNameChange,
  handleEmailChange,
  handleMobileNumChange,
  emailValid,
}) => {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    handleEmailChange(value, validateEmail(value));
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
