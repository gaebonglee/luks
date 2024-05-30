import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinId from "../components/join/JoinId";
import JoinPw from "../components/join/JoinPw";
import NameEmailNum from "../components/join/NameEmailNum";
import JoinAddress from "../components/join/JoinAddress";
import Agree from "../components/join/Agree";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../style/join/JoinPage.scss";
import "../style/join/JoinBtn.scss";

const JoinPage = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [memberPw, setMemberPw] = useState("");
  const [pwValid, setPwValid] = useState(true);
  const [memberPwConfirm, setMemberPwConfirm] = useState("");
  const [pwMatch, setPwMatch] = useState(true);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [memberMobileNum, setMemberMobileNum] = useState("");
  const [postcode, setPostcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [allAgree, setAllAgree] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);

  const handleIdChange = (value, isValid) => {
    setMemberId(value);
    setIdValid(isValid);
    if (isValid) {
      checkIdDuplicate(value);
    } else {
      setIsDuplicate(false);
    }
  };

  const checkIdDuplicate = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/join/check-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_id: id }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error("Error checking ID duplicate:", error);
      setIsDuplicate(false);
    }
  };

  const handlePwChange = (value, isValid, match) => {
    setMemberPw(value);
    setPwValid(isValid);
    setPwMatch(match);
  };

  const handlePwConfirmChange = (value, match) => {
    setMemberPwConfirm(value);
    setPwMatch(match);
  };

  const handleNameChange = (value) => {
    setMemberName(value);
  };

  const handleEmailChange = (value, isValid) => {
    setMemberEmail(value);
    setEmailValid(isValid);
  };

  const handleMobileNumChange = (value) => {
    setMemberMobileNum(value);
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

  const handleAllAgreeChange = (isChecked) => {
    setAllAgree(isChecked);
    setTermsAgree(isChecked);
    setPrivacyAgree(isChecked);
  };

  const handleTermsAgreeChange = (isChecked) => {
    setTermsAgree(isChecked);
    setAllAgree(isChecked && privacyAgree);
  };

  const handlePrivacyAgreeChange = (isChecked) => {
    setPrivacyAgree(isChecked);
    setAllAgree(isChecked && termsAgree);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    // 모든 필수 항목이 입력되었는지 확인
    if (
      !memberId ||
      !memberPw ||
      !memberName ||
      !memberEmail ||
      !memberMobileNum ||
      !postcode ||
      !basicAddress
    ) {
      MySwal.fire({
        icon: "error",
        title: "필수 항목 누락",
        text: "모든 필수 항목을 입력하세요.",
      });
      return;
    }

    if (isDuplicate) {
      MySwal.fire({
        icon: "error",
        title: "아이디 중복",
        text: `${memberId}는 이미 가입된 아이디입니다.`,
      });
      return;
    }

    if (!termsAgree || !privacyAgree) {
      MySwal.fire({
        icon: "error",
        title: "이용약관, 개인정보수집 및 이용",
        text: "모두 동의해주세요.",
      });
      return;
    }

    const memberData = {
      member_id: memberId,
      member_pw: memberPw,
      member_name: memberName,
      member_roles: "member", // 기본값 설정
      email: memberEmail,
      phonenumber: memberMobileNum,
      postcode: postcode,
      basic_address: basicAddress,
      detail_address: detailAddress,
    };

    fetch("http://localhost:5000/join/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        MySwal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다!",
          text: "로그인 페이지로 이동합니다.",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        MySwal.fire({
          icon: "error",
          title: "회원가입에 실패했습니다.",
        });
      });
  };

  return (
    <div className="joinPage_container">
      <form
        method="post"
        className="joinForm"
        id="joinForm"
        onSubmit={handleConfirm}
      >
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
                  emailValid={emailValid}
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
        <Agree
          allAgree={allAgree}
          termsAgree={termsAgree}
          privacyAgree={privacyAgree}
          handleAllAgreeChange={handleAllAgreeChange}
          handleTermsAgreeChange={handleTermsAgreeChange}
          handlePrivacyAgreeChange={handlePrivacyAgreeChange}
        />
        <div className="joinBtn">
          <button id="join-button" type="submit" className="btnSubmit sizeM">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
