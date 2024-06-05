import React from "react";
import "../../../style/mypage/MyOrderList.scss";

const MyOrderList = () => {
  return (
    <section className="right_section">
      <div className="MyOrderList">
        <h3>주문배송조회</h3>
        <div className="MyOrderList_contents">
          <table className="MyOrderList_table">
            <thead>
              <tr>
                <th>상품정보</th>
                <th>진행상태</th>
                <th>구매확정 및 리뷰</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3">
                  <div className="MyOrderList_orderInfo">
                    <a>
                      <span>주문일자</span>
                      <span className="bold">ㄴㄴ</span>
                    </a>
                    <a>
                      <span>주문번호</span>
                      <span className="bold">ㄴㄴ</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="MyOrderList_detailWrap">
                  <img src="" alt="상품 이미지" />
                  <div className="MyOrderList_detail">
                    <div className="MyOrderList_detail name">상품이름이름</div>
                    <div className="MyOrderList_detail colorSize">
                      <span>색상: </span>
                      <span>사이즈: </span>
                    </div>
                    <div className="MyOrderList_detail priceWrap">
                      <span>원</span>
                      <span>/</span>
                      <span>수량 개</span>
                    </div>
                  </div>
                </td>
                <td className="MyOrderList_progress">
                  <p>진행상태</p>
                </td>
                <td className="MyOrderList_review">
                  <a>구매확정</a>
                  <a>리뷰작성</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyOrderList;
