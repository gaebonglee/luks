import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinId from "../../../components/join/JoinId";
import JoinPw from "../../../components/join/JoinPw";
import NameEmailNum from "../../../components/join/NameEmailNum";
import JoinAddress from "../../../components/join/JoinAddress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../../style/join/JoinPage.scss";
import "../../../style/join/JoinBtn.scss";

const Mymodify = () => {
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

  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/mypage/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 세션 정보 포함
        });
        const data = await response.json();
        setMemberId(data.member_id);
        setMemberName(data.member_name);
        setMemberEmail(data.email);
        setMemberMobileNum(data.phonenumber);
        setPostcode(data.postcode);
        setBasicAddress(data.basic_address);
        setDetailAddress(data.detail_address);
      } catch (error) {
        console.error("Error fetching member information:", error);
      }
    };

    fetchMemberInfo();
  }, []);

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

  const handleConfirm = (e) => {
    e.preventDefault();

    // 모든 필수 항목이 입력되었는지 확인
    if (
      !memberId ||
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

    fetch("http://localhost:5000/mypage/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
          title: "회원정보가 수정되었습니다!",
        }).then(() => {
          navigate("/mypage");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        MySwal.fire({
          icon: "error",
          title: "회원정보 수정에 실패했습니다.",
          text: "조건에 맞춰 회원정보를 수정해주세요.",
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
