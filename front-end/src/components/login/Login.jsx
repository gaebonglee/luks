import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/login/login.scss";


import axios from "axios";
import Swal from "sweetalert2";


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
  //   }
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const member_id = event.target.member_id.value;
    const member_pw = event.target.member_pw.value;

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

  // const handlerKakaoLogin = () => {
  //   window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&scope=name,account_email,phone_number,shipping_address`;
  // };

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
