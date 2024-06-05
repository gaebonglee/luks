import React from "react";
import "../../../style/myorder/MyOrderProduct.scss";

const MyOrderProduct = () => {
  return (
    <section className="MyOrderProduct_section">
      <div className="MyOrderProduct_titleWrap">
        <h3>주문상품정보</h3>
        <a>주문일자 : </a>
      </div>
      <div className="MyOrderProduct_contents">
        <table className="MyOrderProduct_table">
          <thead>
            <tr>
              <th>상품정보</th>
              <th>진행상태</th>
              <th>구매확정 및 리뷰</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="MyOrderProduct_detailWrap">
                <img></img>
                <div className="MyOrderProduct_detail">
                  <div className="MyOrderProduct_detail name">상품이름이름</div>
                  <div className="MyOrderProduct_detail colorSize">
                    <span>색상: </span>
                    <span>사이즈: </span>
                  </div>
                  <div className="MyOrderProduct_detail priceWrap">
                    <span>원</span>
                    <span>/</span>
                    <span>수량 개</span>
                  </div>
                </div>
              </td>
              <td className="MyOrderProduct_progress">
                <p>진행상태</p>
              </td>
              <td className="MyOrderProduct_review">
                <a>구매확정</a>
                <a>리뷰작성</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrderProduct;
