import React from "react";
import "../../../style/myorder/MyOrderProduct.scss";

const MyOrderProduct = ({ order }) => {
  return (
    <section className="MyOrderProduct_section">
      <div className="MyOrderProduct_titleWrap">
        <h3>주문상품정보</h3>
        <a>주문일자 : {new Date(order[0].order_date).toLocaleDateString()}</a>
      </div>
      <div className="MyOrderProduct_contents">
        <table className="MyOrderProduct_table">
          <thead>
            <tr>
              <th>상품정보</th>
              <th>진행상태</th>
              <th>리뷰</th>
              {/* <th>구매확정 및 리뷰</th> */}
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item.product_id}>
                <td className="MyOrderProduct_detailWrap">
                  <img src={item.p_image_url} alt="상품 이미지" />
                  <div className="MyOrderProduct_detail">
                    <div className="MyOrderProduct_detail name">
                      {item.p_name}
                    </div>
                    <div className="MyOrderProduct_detail colorSize">
                      <span>색상: {item.color_name}</span>
                      <span>사이즈: {item.size}</span>
                    </div>
                    <div className="MyOrderProduct_detail priceWrap">
                      <span>{item.price.toLocaleString()}원</span>
                      <span>/</span>
                      <span>수량 {item.quantity}개</span>
                    </div>
                  </div>
                </td>
                <td className="MyOrderProduct_progress">
                  <p>{item.status}</p>
                </td>
                <td className="MyOrderProduct_review">
                  {/* <a>구매확정</a> */}
                  <a>리뷰작성</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrderProduct;
