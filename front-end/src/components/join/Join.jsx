import React from "react";
import "../../style/join/Join.scss";
import { IoCheckmarkDone } from "react-icons/io5";

const Join = () => {
  return (
    <form method="post" className="joinForm" id="joinForm">
      <div className="join_container">
        <div className="join_wrap">
          <table>
            <tbody>
              <tr>
                <th scope="row">아이디</th>
                <td className="input_td">
                  <input
                    className="inputTypeText"
                    name="member_id"
                    id="member_id"
                    type="text"
                  ></input>
                </td>
                <td className="join_guide">
                  <p className="id_msg">
                    <IoCheckmarkDone />
                    <div className="conditionWrap">
                      <span id="id_condition1">소문자</span>
                      <span id="id_condition2">숫자</span>
                      <span id="id_condition3">8~16자 이내</span>
                    </div>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">비밀번호</th>
                <td className="input_td">
                  <input
                    id="member_pw1"
                    name="member_pw1"
                    class="inputTypeText"
                    type="text"
                    placeholder="특수문자 !@#$%^&*만 입력가능"
                  />
                </td>
                <td className="join_guide">
                  <p className="pw1_msg">
                    <IoCheckmarkDone />
                    <div className="conditionWrap">
                      <span id="pw_condition1">대소문자</span>
                      <span id="pw_condition2">숫자</span>
                      <span id="pw_condition3">특수문자</span>
                      <span id="pw_condition4">8~16자 이내</span>
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
                  />
                </td>
                <td className="join_guide">
                  <p className="pw2_msg">
                    <IoCheckmarkDone />
                    <div className="conditionWrap">
                      <span id="pw_condition5">비밀번호 일치</span>
                    </div>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">이름</th>
                <td className="input_td">
                  <input
                    id="member_name"
                    name="member_name"
                    class="inputTypeText"
                    type="text"
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
                    class="inputTypeText"
                    type="text"
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
                    maxlength="12"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td className="input_td">
                  <input
                    id="member_address"
                    name="member_address"
                    type="text"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export default Join;
