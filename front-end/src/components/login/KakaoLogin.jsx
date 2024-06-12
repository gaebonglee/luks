import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      axios
        .post("http://localhost:5000/snslogin/oauth/kakao", { code })
        .then((response) => {
          if (response.data.success) {
            Swal.fire("로그인 되었습니다.").then(() => {
              navigate("/");
            });
          } else {
            Swal.fire("로그인에 실패했습니다.").then(() => {
              navigate("/login");
            });
          }
        })
        .catch((error) => {
          console.error("Kakao login error:", error);
          Swal.fire("로그인 중 오류가 발생했습니다.").then(() => {
            navigate("/");
          });
        });
    }
  }, [navigate]);

  return <div></div>;
};

export default KakaoLogin;
