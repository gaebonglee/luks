import React from "react";

const NameEmailNum = ({
  memberName,
  memberEmail,
  memberMobileNum,
  handleNameChange,
  handleEmailChange,
  handleMobileNumChange,
}) => {
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
            onChange={handleNameChange}
          />
          <span id="name_msg"> </span>
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
            onChange={handleEmailChange}
          />
          <span id="email_msg"> </span>
        </td>
      </tr>
      <tr>
        <th scope="row">휴대전화</th>
        <td className="input_td">
          <input
            id="member_mobile_num"
            name="member_mobile_num"
            maxLength="12"
            type="text"
            value={memberMobileNum}
            onChange={handleMobileNumChange}
          />
        </td>
      </tr>
    </>
  );
};

export default NameEmailNum;
