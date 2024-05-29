import React from "react";
import { Link } from "react-router-dom";
import "../../style/login.scss";

const login = () => {
  return (
    <form method="post" className="loginForm" id="loginForm">
      <div className="login_container">
        <div className="login_wrap">
          <label className="id loginPlaceholder">
            <strong>아이디</strong>
            <input
              id="member_id"
              name="member_id"
              className="inputTypeText"
              placeholder="아이디"
              type="text"
            />
          </label>
          <label className="pw loginPlaceholder">
            <strong>비밀번호</strong>
            <input
              id="member_pw1"
              name="member_pw1"
              className="inputTypeText"
              placeholder="비밀번호"
              type="password"
            />
          </label>
        </div>

        <div className="loginBtn_wrap">
          <button type="submit">로그인</button>
          <ul className="login_util">
            <li>
              <a>아이디 찾기</a>
            </li>
            <li>
              <a>비밀번호 찾기</a>
            </li>
            <li>
              <Link to={"/join"}>회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default login;
