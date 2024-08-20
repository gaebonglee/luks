import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/login/login.scss";
import axios from "axios";
import Swal from "sweetalert2";

// Props 타입 정의
interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const member_id = (form.member_id as HTMLInputElement).value;
    const member_pw = (form.member_pw as HTMLInputElement).value;

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          member_id,
          member_pw,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsLoggedIn(true);
        Swal.fire("로그인 되었습니다.").then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "아이디 또는 비밀번호를 다시 확인해주세요.",
          customClass: {
            popup: "swal2-popup",
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
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
        <div className="sns_loginWrap">
          {/* <button type="button" onClick={handlerKakaoLogin}>
            <img src="/images/kakao_login_btn.png" alt="kakao_loginbtn" />
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default Login;
