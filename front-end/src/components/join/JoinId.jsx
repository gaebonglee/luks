import React from "react";
import { FaCheck } from "react-icons/fa6";

const JoinId = ({ memberId, idValid, handleIdChange }) => {
  const validateId = (id) => {
    const idRegex = /^[a-z0-9]{8,16}$/;
    return idRegex.test(id);
  };

  const onChange = (e) => {
    const value = e.target.value;
    handleIdChange(value, validateId(value));
  };

  return (
    <tr>
      <th scope="row">아이디</th>
      <td className="input_td">
        <input
          className="inputTypeText"
          name="member_id"
          id="member_id"
          type="text"
          value={memberId}
          onChange={onChange}
        />
      </td>
      <td className="join_guide">
        <div className="conditionWrap">
          <span id="id_condition">
            {!idValid && (
              <span className="warning">조건에 맞게 입력해주세요.</span>
            )}
            <span>영문 소문자/숫자, 8자~16자</span>
            {idValid && <FaCheck />}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default JoinId;
