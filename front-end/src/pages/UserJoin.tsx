import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinId from "../components/join/JoinId";
import JoinPw from "../components/join/JoinPw";
import NameEmailNum from "../components/join/NameEmailNum";
import JoinAddress from "../components/join/JoinAddress";
import JoinAgree from "../components/join/JoinAgree";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../style/join/UserJoin.scss";
import "../style/join/JoinBtn.scss";
import { JoinForm, JoinValidation } from "../types/formType";

const UserJoin: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<JoinForm>({
    memberId: "",
    memberPw: "",
    memberPwConfirm: "",
    memberName: "",
    memberEmail: "",
    memberMobileNum: "",
    postcode: "",
    basicAddress: "",
    detailAddress: "",
    allAgree: false,
    termsAgree: false,
    privacyAgree: false,
  });

  // 유효성 상태 관리
  const [validation, setValidation] = useState<JoinValidation>({
    idValid: true,
    pwValid: true,
    pwMatch: true,
    emailValid: true,
    isDuplicate: false,
  });

  const handleIdChange = (value: string, isValid: boolean) => {
    setFormData({ ...formData, memberId: value });
    setValidation({ ...validation, idValid: isValid });
  };

  const handlePwChange = (value: string, isValid: boolean, match: boolean) => {
    setFormData({ ...formData, memberPw: value });
    setValidation({ ...validation, pwValid: isValid, pwMatch: match });
  };

  const handlePwConfirmChange = (value: string, match: boolean) => {
    setFormData({ ...formData, memberPwConfirm: value });
    setValidation({ ...validation, pwMatch: match });
  };

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, memberName: value });
  };

  const handleEmailChange = (value: string, isValid: boolean) => {
    setFormData({ ...formData, memberEmail: value });
    setValidation({ ...validation, emailValid: isValid });
  };

  const handleMobileNumChange = (value: string) => {
    setFormData({ ...formData, memberMobileNum: value });
  };

  const handlePostcodeChange = (value: string) => {
    setFormData((prevData) => {
      return { ...prevData, postcode: value };
    });
  };

  const handleBasicAddressChange = (value: string) => {
    setFormData((prevData) => {
      return { ...prevData, basicAddress: value };
    });
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, detailAddress: e.target.value });
  };

  const handleAllAgreeChange = (isChecked: boolean) => {
    setFormData({
      ...formData,
      allAgree: isChecked,
      termsAgree: isChecked,
      privacyAgree: isChecked,
    });
  };

  const handleTermsAgreeChange = (isChecked: boolean) => {
    setFormData({
      ...formData,
      termsAgree: isChecked,
      allAgree: isChecked && formData.privacyAgree,
    });
  };

  const handlePrivacyAgreeChange = (isChecked: boolean) => {
    setFormData({
      ...formData,
      privacyAgree: isChecked,
      allAgree: isChecked && formData.termsAgree,
    });
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필수 항목이 입력되었는지 확인
    if (
      !formData.memberId ||
      !formData.memberPw ||
      !formData.memberName ||
      !formData.memberEmail ||
      !formData.memberMobileNum ||
      !formData.postcode ||
      !formData.basicAddress
    ) {
      MySwal.fire({
        icon: "error",
        title: "필수 항목 누락",
        text: "모든 필수 항목을 입력하세요.",
      });
      return;
    }

    if (validation.isDuplicate) {
      MySwal.fire({
        icon: "error",
        title: "아이디 중복",
        text: `${formData.memberId}는 이미 가입된 아이디입니다.`,
      });
      return;
    }

    if (!formData.termsAgree || !formData.privacyAgree) {
      MySwal.fire({
        icon: "error",
        title: "이용약관, 개인정보수집 및 이용",
        text: "모두 동의해주세요.",
      });
      return;
    }

    const memberData = {
      member_id: formData.memberId,
      member_pw: formData.memberPw,
      member_name: formData.memberName,
      member_roles: "member", // 기본값 설정
      email: formData.memberEmail,
      phonenumber: formData.memberMobileNum,
      postcode: formData.postcode,
      basic_address: formData.basicAddress,
      detail_address: formData.detailAddress,
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
                  memberId={formData.memberId}
                  idValid={validation.idValid}
                  isDuplicate={validation.isDuplicate}
                  handleIdChange={handleIdChange}
                />
                <JoinPw
                  memberPw={formData.memberPw}
                  pwValid={validation.pwValid}
                  memberPwConfirm={formData.memberPwConfirm}
                  pwMatch={validation.pwMatch}
                  handlePwChange={handlePwChange}
                  handlePwConfirmChange={handlePwConfirmChange}
                />
                <NameEmailNum
                  memberName={formData.memberName}
                  memberEmail={formData.memberEmail}
                  memberMobileNum={formData.memberMobileNum}
                  handleNameChange={handleNameChange}
                  handleEmailChange={handleEmailChange}
                  handleMobileNumChange={handleMobileNumChange}
                  emailValid={validation.emailValid}
                />
                <JoinAddress
                  key={formData.postcode}
                  postcode={formData.postcode}
                  basicAddress={formData.basicAddress}
                  detailAddress={formData.detailAddress}
                  handlePostcodeChange={handlePostcodeChange}
                  handleBasicAddressChange={handleBasicAddressChange}
                  handleDetailAddressChange={handleDetailAddressChange}
                />
              </tbody>
            </table>
          </div>
        </div>
        <JoinAgree
          allAgree={formData.allAgree}
          termsAgree={formData.termsAgree}
          privacyAgree={formData.privacyAgree}
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

export default UserJoin;
