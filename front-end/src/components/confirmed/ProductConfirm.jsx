import React from "react";
import "../../style/confirm/ProductConfirm.scss";

const ProductConfirm = ({ selectedItems }) => {
  return (
    <section className="ProductConfirm_section">
      <h3>주문상품정보 / {selectedItems.length}개 상품</h3>
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
            {selectedItems.map((item) => (
              <tr key={`${item.product_id}-${item.color_id}-${item.size_id}`}>
                <td className="product_wrap">
                  <div className="row">
                    <img src={item.p_image_url} alt="상품 이미지" />
                  </div>
                </td>
                <td className="ProductConfirm_productInfo">
                  <div className="wrap">
                    <div className="ProductConfirm_productInfo_detail">
                      <h3>{item.p_name}</h3>
                      <p>
                        <strong>{item.p_price.toLocaleString()}원</strong>
                      </p>
                      <p>
                        옵션: {item.color_name}, {item.size}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="ProductConfirm_qantity">
                  <p>{item.quantity}개</p>
                </td>
                <td className="ProductConfirm_progress">
                  <p>결제완료</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductConfirm;
