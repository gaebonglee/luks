import React, { useState } from "react";
import "../../style/login/ConfirmPassword.scss";

const ConfirmPassword = ({ onConfirm }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 비밀번호 확인 로직을 추가하세요
    if (password === "correct_password") {
      onConfirm();
    } else {
      alert("Incorrect password!");
    }
  };

  return (
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
              <p>sss</p>
            </div>
            <div className="in_row">
              <label>비밀번호</label>
              <div className="in_row inputbox">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="reconfirmBtn">
          <button type="submit">다음</button>
        </div>
      </form>
    </section>
  );
};

export default ConfirmPassword;
