import React, { useState } from "react";
import "../../style/join/Join.scss";
import JoinId from "./JoinId";
import JoinPw from "./JoinPw";
import NameEmailNum from "./NameEmailNum";
import JoinAddress from "./JoinAddress";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [memberPw, setMemberPw] = useState("");
  const [pwValid, setPwValid] = useState(true);
  const [memberPwConfirm, setMemberPwConfirm] = useState("");
  const [pwMatch, setPwMatch] = useState(true);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberMobileNum, setMemberMobileNum] = useState("");
  const [postcode, setPostcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const validateId = (id) => {
    const idRegex = /^[a-z0-9]{8,16}$/;
    return idRegex.test(id);
  };

  const validatePw = (pw) => {
    const lengthCheck = /^.{8,16}$/;
    const upperCheck = /[A-Z]/;
    const lowerCheck = /[a-z]/;
    const numberCheck = /[0-9]/;
    const specialCheck = /[!@#$%^&*]/;

    const checks = [
      upperCheck.test(pw),
      lowerCheck.test(pw),
      numberCheck.test(pw),
      specialCheck.test(pw),
    ];
    const validChecks = checks.filter((check) => check).length;

    return lengthCheck.test(pw) && validChecks >= 2;
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setMemberId(value);
    setIdValid(validateId(value));
  };

  const handlePwChange = (e) => {
    const value = e.target.value;
    setMemberPw(value);
    setPwValid(validatePw(value));
    setPwMatch(value === memberPwConfirm);
  };

  const handlePwConfirmChange = (e) => {
    const value = e.target.value;
    setMemberPwConfirm(value);
    setPwMatch(value === memberPw);
  };

  const handleNameChange = (e) => {
    setMemberName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setMemberEmail(e.target.value);
  };

  const handleMobileNumChange = (e) => {
    setMemberMobileNum(e.target.value);
  };

  const handlePostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  const handleBasicAddressChange = (e) => {
    setBasicAddress(e.target.value);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  return (
    <form method="post" className="joinForm" id="joinForm">
      <div className="join_container">
        <div className="join_wrap">
          <table>
            <tbody>
              <JoinId
                memberId={memberId}
                idValid={idValid}
                handleIdChange={handleIdChange}
              />
              <JoinPw
                memberPw={memberPw}
                pwValid={pwValid}
                memberPwConfirm={memberPwConfirm}
                pwMatch={pwMatch}
                handlePwChange={handlePwChange}
                handlePwConfirmChange={handlePwConfirmChange}
              />
              <NameEmailNum
                memberName={memberName}
                memberEmail={memberEmail}
                memberMobileNum={memberMobileNum}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                handleMobileNumChange={handleMobileNumChange}
              />
              <JoinAddress
                postcode={postcode}
                basicAddress={basicAddress}
                detailAddress={detailAddress}
                handlePostcodeChange={handlePostcodeChange}
                handleBasicAddressChange={handleBasicAddressChange}
                handleDetailAddressChange={handleDetailAddressChange}
              />
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export default Join;
