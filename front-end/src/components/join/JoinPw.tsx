import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

// Props 타입 정의
interface JoinPwProps {
  memberPw: string;
  pwValid: boolean;
  memberPwConfirm: string;
  pwMatch: boolean;
  handlePwChange: (
    memberPw: string,
    isValid: boolean,
    isMatch: boolean
  ) => void;
  handlePwConfirmChange: (memberPwConfirm: string, isMatch: boolean) => void;
}

const JoinPw: React.FC<JoinPwProps> = ({
  memberPw,
  pwValid,
  memberPwConfirm,
  pwMatch,
  handlePwChange,
  handlePwConfirmChange,
}) => {
  const [pwConfirmTouched, setPwConfirmTouched] = useState<boolean>(false);

  // 비밀번호 유효성 검사 함수
  const validatePw = (pw: string): boolean => {
    const lengthCheck = /^.{8,16}$/;
    const upperCheck = /[A-Z]/;
    const lowerCheck = /[a-z]/;
    const numberCheck = /[0-9]/;
    const specialCheck = /[!@#$%^&*]/;

    const checks = [
      upperCheck.test(pw),
      lowerCheck.test(pw),
      numberCheck.test(pw),
      specialCheck.test(pw),
    ];

    const validChecks = checks.filter((check) => check).length;

    return lengthCheck.test(pw) && validChecks >= 2;
  };

  // 비밀번호 변경 시 처리 함수
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = validatePw(value);
    handlePwChange(value, isValid, value === memberPwConfirm);
  };

  // 비밀번호 확인 변경 시 처리 함수
  const onChangePwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handlePwConfirmChange(value, value === memberPw);
    setPwConfirmTouched(true);
  };

  return (
    <>
      <tr>
        <th scope="row">비밀번호</th>
        <td className="input_td">
          <input
            id="member_pw"
            name="member_pw"
            className="inputTypeText"
            type="text"
            value={memberPw}
            onChange={onChangePw}
            placeholder="특수문자 !@#$%^&*만 입력가능"
          />
        </td>
        <td className="join_guide">
          <div className="conditionWrap">
            <span id="pw_condition1">
              {!pwValid && (
                <span className="warning">조건에 맞게 입력해주세요.</span>
              )}
              <span>
                영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
              </span>
              {pwValid && <FaCheck />}
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">비밀번호 확인</th>
        <td className="input_td">
          <input
            id="member_pw2"
            name="member_pw_confirm"
            className="inputTypeText"
            type="text"
            value={memberPwConfirm}
            onChange={onChangePwConfirm}
            onBlur={() => setPwConfirmTouched(true)}
          />
        </td>
        <td className="join_guide">
          <div className="conditionWrap">
            <span id="pw_condition2">
              {pwConfirmTouched && !pwMatch && (
                <span className="warning">비밀번호가 일치하지 않습니다.</span>
              )}
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default JoinPw;
