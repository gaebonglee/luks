import React from "react";
import "../style/layout/Footer.scss";

const MainFooter: React.FC = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_top">
          <div className="cs_section">
            <a>고객센터 1588-1588 </a>
            <a>운영시간 : 평일 09:00 ~ 17 : 30 (점심시간 12:00 ~ 13:00 제외)</a>
          </div>
          <div className="documentation">
            <a>개인정보 처리방침</a>
            <a> 이용약관</a>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="infoSection top">
            <span>상호명 : 주식회사 룩스</span>
            <span>사업장소재지 : 서울특별시 서초구 서운로 220</span>
            <span>통신판매업신고 : 2024-서울강남-0610</span>
          </div>
          <div className="infoSection bottom">
            <span>전화번호 : 1588-1588</span>
            <span>이메일 : 0000@luks.co.kr</span>
            <span>대표 : 룩스</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
