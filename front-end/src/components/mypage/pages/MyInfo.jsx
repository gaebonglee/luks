import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/mypage/MyInfo.scss";
import Swal from "sweetalert2";

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setUserId(response.data.user.id); // 세션에서 사용자 아이디 가져오기
        }
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:5000/confirmPassword`,
        { password },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/mypage/edit/info");
      } else {
        Swal.fire("비밀번호를 다시 확인해주세요");
        
      }
    } catch (error) {
      console.error("There was an error confirming the password!", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="right_section">
      <section className="ConfirmPassword_section">
        <div className="ConfirmPassword_titleWrap">
          <h3>비밀번호 재확인</h3>
          <a>회원님의 소중한 정보보호를 위해 비밀번호를 재확인하고 있습니다.</a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="reconfirmWrap">
            <div className="reconfirm">
              <div className="in_row">
                <label>아이디</label>
                <p>{userId}</p>
              </div>
              <div className="in_row">
                <label>비밀번호</label>
                <div className="in_row inputbox">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="reconfirmBtn">
            <button type="submit">다음</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default MyInfo;
