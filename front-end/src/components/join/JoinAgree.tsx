import React, { useEffect } from "react";
import TermsText from "./TermsText";
import PrivacyText from "./PrivacyText";
import "../../style/join/Agree.scss";

// props에 대한 타입 정의
interface AgreeProps {
  allAgree: boolean;
  termsAgree: boolean;
  privacyAgree: boolean;
  handleAllAgreeChange: (checked: boolean) => void;
  handleTermsAgreeChange: (checked: boolean) => void;
  handlePrivacyAgreeChange: (checked: boolean) => void;
}

const Agree: React.FC<AgreeProps> = ({
  allAgree,
  termsAgree,
  privacyAgree,
  handleAllAgreeChange,
  handleTermsAgreeChange,
  handlePrivacyAgreeChange,
}) => {
  useEffect(() => {
    handleAllAgreeChange(termsAgree && privacyAgree);
  }, [termsAgree, privacyAgree, handleAllAgreeChange]);

  return (
    <div className="agree_wrap">
      <div className="allAgree_wrap">
        <h4>전체동의</h4>
        <div className="baseBox_gStrong">
          <span className="baseBox_check">
            <input
              type="checkbox"
              id="allAgree"
              checked={allAgree}
              onChange={(e) => handleAllAgreeChange(e.target.checked)}
            />
          </span>
          <label>
            <strong>이용약관 및 개인정보수집 및 이용에 모두 동의합니다.</strong>
          </label>
        </div>
      </div>
      <div className="mustAgree_wrap">
        <div className="mustAgree_content1">
          <h4>[필수] 이용약관 동의</h4>
          <div className="all_agreement">
            <TermsText />
            <br />
            <div className="agreeCheck">
              <p>이용약관에 동의하십니까?</p>
              <div className="agreeCheck_checkBox">
                <input
                  type="checkbox"
                  id="yes_agree_terms"
                  className="yes_agree_checkbox"
                  checked={termsAgree}
                  onChange={(e) => handleTermsAgreeChange(e.target.checked)}
                />
                <a>동의함</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mustAgree_content2">
          <h4>[필수] 개인정보 수집목적 및 이용</h4>
          <div className="all_agreement">
            <PrivacyText />
            <div className="agreeCheck">
              <p>개인정보 수집목적 및 이용에 동의하십니까?</p>
              <div className="agreeCheck_checkBox">
                <input
                  type="checkbox"
                  id="yes_agree_privacy"
                  className="yes_agree_checkbox"
                  checked={privacyAgree}
                  onChange={(e) => handlePrivacyAgreeChange(e.target.checked)}
                />
                <a>동의함</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agree;
