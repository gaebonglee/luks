import React from "react";
import axios from "axios";
import Join from "../components/join/Join";
import Joinbtn from "../components/join/Joinbtn";
import Agree from "../components/join/Agree";
import "../style/join/JoinPage.scss";

const JoinPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("joinPageForm"));
    const data = Object.fromEntries(formData.entries());

    // 전송할 데이터 확인 (디버깅 용도)
    console.log("Form Data: ", data);

    axios
      .post("http://127.0.0.1:5000/join/saveMemberInfo", data)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error: ", error.response.data);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <form
      method="post"
      id="joinPageForm"
      className="joinPageForm"
      onSubmit={handleSubmit}
    >
      <div className="joinPage_container">
        <Join />
        <Agree />
        <Joinbtn />
      </div>
    </form>
  );
};

export default JoinPage;
