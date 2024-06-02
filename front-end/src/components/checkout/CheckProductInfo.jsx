import React from "react";
import "../../style/checkout/CheckProductInfo.scss";

const CheckProductInfo = () => {
  return (
    <section className="checkProduct_section">
      <div className="checkProduct_wrap">
        <table>
          <thead>
            <h2>상품 정보 확인 / 총 N개</h2>
          </thead>
          <tbody>
            <tr>
              <th>
                <div className="checkProduct_img">
                  <img src=""></img>
                </div>
                <div className="checkProduct_detailWrap">
                  <div className="checkProduct_detail">
                    <div className="checkProduct_detail name">상품이름</div>
                    <div className="checkProduct_detail colorSize">
                      <a>색상: </a>
                      <a>사이즈: </a>
                    </div>
                    <div className="checkProduct_detail priceWrap">
                      <a>원</a>
                      <a>/</a>
                      <a>수량 N개</a>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CheckProductInfo;
