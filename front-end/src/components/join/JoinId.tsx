import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface JoinIdProps {
  memberId: string;
  idValid: boolean;
  handleIdChange: (id: string, isValid: boolean) => void;
}

const JoinId: React.FC<JoinIdProps> = ({
  memberId,
  idValid,
  handleIdChange,
}) => {
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const checkIdDuplicate = async (id: string) => {
    try {
      const response = await fetch("http://localhost:5000/join/check-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_id: id }),
      });
      const data = await response.json();
      if (response.status === 409) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error("Error checking ID duplicate:", error);
      setIsDuplicate(false);
    }
  };

  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    const value = e.target.value;
    const isValid = validateId(value); 
    handleIdChange(value, isValid); 

    if (isValid) {
        checkIdDuplicate(value);
      } else {
        setIsDuplicate(false);
      }
    };

    const validateId = (id: string): boolean => {
        const idRegex = /^[a-z0-9]{8,16}$/; 
        // 영문 소문자와 숫자, 8~16자
        return idRegex.test(id);
      };


  return  <>
  <tr>
    <th scope="row">아이디</th>
    <td className="input_td">
      <input
        className="inputTypeText"
        name="member_id"
        id="member_id"
        type="text"
        value={memberId}
        onChange={onIdChange}
      />
    </td>
    <td className="join_guide">
      <div className="id_msg">
        <div className="conditionWrap">
          <span id="id_condition">
            {!idValid && (
              <span className="warning">조건에 맞게 입력해주세요.</span>
            )}
            {isDuplicate && (
              <span className="warning">
                "{memberId}"는 이미 가입된 아이디입니다.
              </span>
            )}

            {!isDuplicate && <span>영문 소문자/숫자, 8자~16자</span>}
            {!isDuplicate && idValid && <FaCheck />}
          </span>
        </div>
      </div>
    </td>
  </tr>
</>;
};

export default JoinId;
