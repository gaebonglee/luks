import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const JoinPw = ({
  memberPw,
  pwValid,
  memberPwConfirm,
  pwMatch,
  handlePwChange,
  handlePwConfirmChange,
}) => {
  const [pwConfirmTouched, setPwConfirmTouched] = useState(false);

  const handlePwConfirmBlur = () => {
    setPwConfirmTouched(true);
  };

  return (
    <>
      <tr>
        <th scope="row">비밀번호</th>
        <td className="input_td">
          <input
            id="member_pw1"
            name="member_pw1"
            className="inputTypeText"
            type="text"
            value={memberPw}
            onChange={handlePwChange}
            placeholder="특수문자 !@#$%^&*만 입력가능"
          />
        </td>
        <td className="join_guide">
          <p className="pw1_msg">
            <div className="conditionWrap">
              <span id="pw_condition1">
                {!pwValid && (
                  <a className="warning">조건에 맞게 입력해주세요.</a>
                )}
                <a>영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자</a>
                {pwValid && <FaCheck />}
              </span>
            </div>
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">비밀번호 확인</th>
        <td className="input_td">
          <input
            id="member_pw2"
            className="inputTypeText"
            type="text"
            value={memberPwConfirm}
            onChange={handlePwConfirmChange}
            onBlur={handlePwConfirmBlur}
          />
        </td>
        <td className="join_guide">
          <p className="pw2_msg">
            <div className="conditionWrap">
              <span id="pw_condition2">
                {pwConfirmTouched && !pwMatch && (
                  <a className="warning">비밀번호가 일치하지 않습니다.</a>
                )}
              </span>
            </div>
          </p>
        </td>
      </tr>
    </>
  );
};

export default JoinPw;
