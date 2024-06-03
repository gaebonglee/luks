import React from "react";
import "../../style/confirm/ProductConfirm.scss";

const ProductConfirm = () => {
  return (
    <section className="ProductConfirm_section">
      <h3>주문상품정보 / 개 상품</h3>
      <div className="ProductConfirm_wrap">
        <table className="ProductConfirm_table">
          <thead>
            <tr>
              <th>상품</th>
              <th>상품정보</th>
              <th>수량</th>
              <th>진행상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product_wrap">
                <div className="row">
                  <img alt="상품 이미지" />
                </div>
              </td>
              <td className="ProductConfirm_productInfo">
                <div className="wrap">
                  <div className="ProductConfirm_productInfo_detail">
                    <h3>상품이름</h3>
                    <p>
                      <strong>원</strong>
                    </p>
                    <p>옵션: </p>
                  </div>
                </div>
              </td>
              <td className="ProductConfirm_qantity">
                <p>수량</p>
              </td>
              <td className="ProductConfirm_progress">
                <p>진행상태</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductConfirm;
