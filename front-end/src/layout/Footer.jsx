import React from "react";
import { Link } from "react-router-dom";
import "../style/layout/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="footer_container">
          <div className="footer_top">
            <div className="cs_section">
              <p className="top">고객센터 1588-1588</p>
              <p className="bottom">
                운영시간 : 평일 09:00 ~ 17 : 30 (점심시간 12:00 ~ 13:00 제외)
              </p>
            </div>
            <div className="menu_section">
              <ul className="menu_list">
                <li>
                  <Link to="#" className="documentation">
                    개인정보 처리방침
                  </Link>
                </li>
                <span />
                <li>
                  <Link to="#" className="documentation">
                    이용약관
                  </Link>
                </li>
                {/*<span />
                 <li>
                  <Link to="#" className="notice_page">
                    공지사항
                  </Link>
                </li>
                <span />
                <li>
                  <Link to="#" className="FAQ_page">
                    자주 묻는 질문
                  </Link>
                </li>
                <span />
                <li>
                  <Link to="#" className="inquiry_page">
                    1:1 문의하기
                  </Link>
                </li>
                <span />
                <li>
                  <Link to="#" className="evnet_page">
                    이벤트
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="info_section">
              <div className="top">
                <span>상호명 : 주식회사 룩스</span>
                <span>사업장소재지 : 서울특별시 서초구 서운로 220</span>
                <span>팩스 : 010-0000-0000</span>
                <span>통신판매업신고 : 2024-서울강남-0610</span>
              </div>
              <div className="bottom">
                <span>전화번호 : 1588-1588</span>
                <span>이메일 : 0000@luks.co.kr</span>
                <span>대표 : 룩스</span>
                <span>개인정보 보호책임자 : 룩스</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
