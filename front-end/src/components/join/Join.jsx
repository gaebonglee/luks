import React from "react";
import "../../style/join/Join.scss";
import { FaCheck } from "react-icons/fa6";

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
                    <div className="conditionWrap">
                      <span id="id_condition">
                        <a>영문 소문자/숫자, 8자~16자</a>
                        <FaCheck />
                      </span>
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
                    <div className="conditionWrap">
                      <span id="pw_condition1">
                        <a>
                          영문 대소문자/숫자/특수문자 중 2가지 이상 조함,
                          8자~16자
                        </a>
                        <FaCheck />
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
                  />
                </td>
                <td className="join_guide">
                  <p className="pw2_msg"></p>
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
