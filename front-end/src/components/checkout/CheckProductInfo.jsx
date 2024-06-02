import React from "react";
import { useLocation } from "react-router-dom";
import "../../style/checkout/CheckProductInfo.scss";

const CheckProductInfo = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedProductDetails || [];

  return (
    <section className="checkProduct_section">
      <div className="checkProduct_wrap">
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <h2>상품 정보 확인 / 총 {selectedItems.length}개</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={`${item.product_id}-${item.color_id}-${item.size_id}`}>
                <td>
                  <div className="checkProduct_img">
                    <img src={item.p_image_url} alt={item.p_name}></img>
                  </div>
                </td>
                <td>
                  <div className="checkProduct_detailWrap">
                    <div className="checkProduct_detail">
                      <div className="checkProduct_detail name">
                        {item.p_name}
                      </div>
                      <div className="checkProduct_detail colorSize">
                        <span>색상: {item.color_name}</span>
                        <span>사이즈: {item.size}</span>
                      </div>
                      <div className="checkProduct_detail priceWrap">
                        <span>{item.p_price.toLocaleString()}원</span>
                        <span>/</span>
                        <span>수량 {item.quantity}개</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CheckProductInfo;
