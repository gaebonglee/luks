// src/components/OAuthCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios
        .get(`http://localhost:5000/oauth/kakaologin?code=${code}`)
        .then((response) => {
          if (response.data.message === "회원가입이 완료되었습니다.") {
            Swal.fire("로그인 되었습니다.").then(() => {
              navigate("/");
            });
          }
        })
        .catch((error) => {
          console.error("Error during Kakao login:", error);
          Swal.fire("로그인 중 문제가 발생했습니다.").then(() => {
            navigate("/");
          });
        });
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;
