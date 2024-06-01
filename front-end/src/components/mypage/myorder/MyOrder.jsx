import React from "react";
import "../../../style/mypage/MyOrder.scss";

const MyOrder = () => {
  return (
    <section className="right_section">
      <div className="myOrder_wrap">
        <div className="myOrder_title">
          <p>주문배송조회</p>
        </div>
        <div className="myOrder_listWrap">
          <div className="myOrder_categry">
            <ul>
              <li className="productInfo">상품정보</li>
              <li className="deliveryCharge">배송비</li>
              <li className="process">진행상태</li>
              <li className="review">리뷰</li>
            </ul>
          </div>
          <div className="myOrder_list">
            <div className="orderInfo_title">
              <div className="orderInfo_date">
                <p>주문일자</p>
                <a>2024-%%-%%</a>
              </div>
              <div className="orderInfo_num">
                <p>주문번호</p>
                <a>2024%%%%####</a>
              </div>
            </div>
            <div className="orderInfo_content"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
