import React from "react";
import { FaCheck } from "react-icons/fa6";

const JoinId = ({ memberId, idValid, handleIdChange }) => {
  return (
    <>
      <tr>
        <th scope="row">아이디</th>
        <td className="input_td">
          <input
            className="inputTypeText"
            name="member_id"
            id="member_id"
            type="text"
            value={memberId}
            onChange={handleIdChange}
          ></input>
        </td>
        <td className="join_guide">
          <p className="id_msg">
            <div className="conditionWrap">
              <span id="id_condition">
                {!idValid && (
                  <a className="warning">조건에 맞게 입력해주세요.</a>
                )}
                <a>영문 소문자/숫자, 8자~16자</a>
                {idValid && <FaCheck />}
              </span>
            </div>
          </p>
        </td>
      </tr>
    </>
  );
};

export default JoinId;
