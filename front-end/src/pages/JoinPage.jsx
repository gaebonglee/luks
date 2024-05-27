import React from "react";
import Join from "../components/join/Join";
import Joinbtn from "../components/join/Joinbtn";
import Agree from "../components/join/Agree";
import "../style/join/JoinPage.scss";

const JoinPage = () => {
  return (
    <form method="post" id="joinPageForm" className="joinPageForm">
      <div className="joinPage_container">
        <Join />
        <Agree />
        <Joinbtn />
      </div>
    </form>
  );
};

export default JoinPage;
