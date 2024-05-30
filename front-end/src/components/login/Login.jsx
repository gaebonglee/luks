import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/login/login.scss";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const member_id = event.target.member_id.value;
    const member_pw = event.target.member_pw.value;

    try {
      const response = await axios.post("http://localhost:5000/login", {
        member_id,
        member_pw,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: "로그인이 완료되었습니다.",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "아이디와 비밀번호를 다시 확인해주세요.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "서버 오류",
        text: "서버와의 통신 중 문제가 발생했습니다.",
      });
    }
  };

  return (
    <form
      method="post"
      className="loginForm"
      id="loginForm"
      onSubmit={handleSubmit}
    >
      <div className="login_container">
        <div className="login_wrap">
          <label className="id loginPlaceholder">
            <strong>아이디</strong>
            <input
              id="member_id"
              name="member_id"
              className="inputTypeText"
              type="text"
            />
          </label>
          <label className="pw loginPlaceholder">
            <strong>비밀번호</strong>
            <input
              id="member_pw"
              name="member_pw"
              className="inputTypeText"
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

export default Login;
