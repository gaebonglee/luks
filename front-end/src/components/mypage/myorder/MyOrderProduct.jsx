import React from "react";
import "../../../style/myorder/MyOrderProduct.scss";

const MyOrderProduct = ({ order }) => {
  return (
    <section className="MyOrderProduct_section">
      <div className="MyOrderProduct_titleWrap">
        <h3>주문상품정보</h3>
      </div>
      <div className="MyOrderProduct_contents">
        <table className="MyOrderProduct_table">
          <thead>
            <tr>
              <th>상품정보</th>
              <th>배송비</th>
              <th>진행상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">
                <div className="MyOrderProduct_orderInfo">
                  <a>
                    <span>주문일자</span>
                    <span className="bold">
                      {new Date(order[0].order_date).toLocaleDateString()}
                    </span>
                  </a>
                  <a>
                    <span>주문번호</span>
                    <span className="bold">{order[0].order_id}</span>
                  </a>
                </div>
              </td>
            </tr>
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
                <td className="MyOrderProduct_shipping">
                  <p>무료배송</p>
                </td>
                <td className="MyOrderProduct_progress">
                  <p>{item.status}</p>
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
