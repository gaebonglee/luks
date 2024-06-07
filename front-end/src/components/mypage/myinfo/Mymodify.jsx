import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinId from "../../../components/join/JoinId";
import JoinPw from "../../../components/join/JoinPw";
import NameEmailNum from "../../../components/join/NameEmailNum";
import JoinAddress from "../../../components/join/JoinAddress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import "../../../style/join/JoinPage.scss";
import "../../../style/join/JoinBtn.scss";

const Mymodify = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [memberMobileNum, setMemberMobileNum] = useState("");
  const [postcode, setPostcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/check-session",
          {
            withCredentials: true,
          }
        );
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          fetchMemberInfo();
        } else {
          setIsLoggedIn(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("There was an error checking the login status!", error);
        navigate("/login");
      }
    };

    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/mypage/memberInfo",
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setMemberId(data.member_id);
        setMemberName(data.member_name);
        setMemberEmail(data.email);
        setMemberMobileNum(data.phonenumber);
        setPostcode(data.postcode);
        setBasicAddress(data.basic_address);
        setDetailAddress(data.detail_address);
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

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
    if (isValid) {
      checkEmailDuplicate(value);
    } else {
      setIsEmailDuplicate(false);
    }
  };

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/mypage/check-email`,
        { withCredentials: true }
      );

      if (response.data.count > 0) {
        setIsEmailDuplicate(true);
      } else {
        setIsEmailDuplicate(false);
      }
    } catch (error) {
      console.error("Error checking email duplicate:", error);
      setIsEmailDuplicate(false);
    }
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

  const handleConfirm = async (e) => {
    e.preventDefault();

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

    if (isEmailDuplicate) {
      MySwal.fire({
        icon: "error",
        title: "이메일 중복",
        text: `${memberEmail}는 이미 사용 중인 이메일입니다.`,
      });
      return;
    }

    if (!pwMatch) {
      MySwal.fire({
        icon: "error",
        title: "비밀번호 불일치",
        text: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    const memberData = {
      member_id: memberId,
      member_pw: memberPw,
      member_name: memberName,
      email: memberEmail,
      phonenumber: memberMobileNum,
      postcode: postcode,
      basic_address: basicAddress,
      detail_address: detailAddress,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/mypage/update",
        memberData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "회원정보 수정 완료",
          text: "회원정보가 성공적으로 수정되었습니다.",
        }).then(() => {
          navigate("/mypage");
        });
      } else {
        throw new Error("Failed to update member info");
      }
    } catch (error) {
      console.error("Error updating member info:", error);
      MySwal.fire({
        icon: "error",
        title: "수정 실패",
        text: "회원정보 수정에 실패했습니다. 다시 시도해주세요.",
      });
    }
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
                  isEmailDuplicate={isEmailDuplicate}
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
        <div className="joinBtn">
          <button id="join-button" type="submit" className="btnSubmit sizeM">
            회원정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default Mymodify;
