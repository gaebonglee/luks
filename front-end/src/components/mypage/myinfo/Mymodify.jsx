import React from "react";
import "../../../style/mypage/Mymodify.scss";

const Mymodify = () => {
  return (
    <section className="Mymodify_section">
      <h3>회원정보 수정</h3>
      <div className="Mymodify_container">
        <ul className="modifyList">
          <li>
            <h4>로그인 정보</h4>
            <ul>
              <div className="modifyList_wrap">
                <div className="lr_wrap">
                  <div className="modify_r"> 아이디(이메일)</div>
                  <div className="modify_l">따따따 </div>
                </div>
                <div className="pw_wrap">
                  <div className="lr_wrap">
                    <div className="modify_r">비밀번호 </div>
                    <div className="modify_l">따따 </div>
                  </div>
                  <button className="Mymodify_ChangeBtn">변경</button>
                </div>
              </div>
            </ul>
          </li>
          <li>
            <h4>회원 정보</h4>
            <div className="modifyList_wrap">
              <div className="user_ly">
                <div className="lr_wrap">
                  <div className="modify_l">성명 </div>
                  <div className="modify_r">이*영</div>
                </div>
                <div className="lr_wrap">
                  <div className="modify_l">연락처 </div>
                  <div className="modify_r">010****####</div>
                </div>
              </div>
              <div className="lr_wrap">
                <button className="goNice">본인인증으로 정보 수정하기</button>
              </div>
              <div className="lr_wrap addressWrap">
                <div className="address_ly">
                  <div className="address_ly email">
                    <div className="address_ly emailWrap">
                      <div className="modify_r">이메일 </div>
                      <div className="modify_l">따따 </div>
                    </div>

                    <button className="Mymodify_ChangeBtn">변경</button>
                  </div>

                  <div className="modify_l">주소 정보 </div>
                  <div className="modify_r">
                    <div className="zipbx">
                      <input></input>
                      <button>우편번호검색</button>
                    </div>
                    <div className="inpbx">
                      <input></input>
                    </div>
                    <div className="inpbx">
                      <input></input>
                    </div>
                    <button className="Mymodify_save">저장하기</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Mymodify;
