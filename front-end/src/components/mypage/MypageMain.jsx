import React from "react";
import "../../style/mypage/MypageMain.scss";
import { IoIosArrowForward } from "react-icons/io";

const MypageMain = () => {
  return (
    <section className="right_section">
      <div className="mypageMain_wrap">
        <div className="recentOrder_wrap">
          <div className="recentOrder_title">
            <p>최근 주문</p>
            <div className="recentOrder_title_more">
              <a>더보기</a>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="recentOrder_list">
            <div className="recentOrder_category">
              <ul>
                <li className="date">주문일</li>
                <li className="history">주문내역</li>
                <li className="num">주문번호</li>
                <li className="amount">결제금액</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MypageMain;
