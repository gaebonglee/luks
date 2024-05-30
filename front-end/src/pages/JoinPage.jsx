import React from "react";
import FromIdToAddress from "../components/join/FromIdToAddress";
import Agree from "../components/join/Agree";
import "../style/join/JoinPage.scss";

const JoinPage = () => {
  return (
    <div className="joinPage_container">
      <FromIdToAddress />
      <Agree />
    </div>
  );
};

export default JoinPage;
