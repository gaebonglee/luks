import React from "react";
import "../../style/myorder/MyOrderProduct.scss";

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
                  <h3>상품이름</h3>
                  <p>옵션: </p>
                  <p>
                    <strong>원</strong>
                  </p>
                </div>
              </td>
              <td className="MyOrderProduct_progress">
                <p>진행상태</p>
              </td>
              <td className="MyOrderProduct_review">
                <button>구매확정</button>
                <button>리뷰작성</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrderProduct;
