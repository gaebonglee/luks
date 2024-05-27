import React from "react";
import "../../style/product/ProductInfo.scss";

const ProductInfo = () => {
  return (
    <section className="productInfo_section">
      <div className="productInfo_wrap1">
        <div className="productInfo_top">
          <div className="product_NamePrice">테스트 테스트</div>
          <div className="product_desc">테스트 테스트 테스트 테스트</div>
        </div>
        <div className="productInfo_middle">
          <ul>
            <li className="product_colorOption">
              <label>COLOR</label>
              <div className="product_optionValue">
                <select className="productOption1" id="productOption1">
                  <option value={"*"}>[필수] COLOR 선택</option>
                  <option value={"**"}>-----------------</option>
                </select>
              </div>
            </li>
            <li className="product_sizeOption">
              <label>SIZE</label>
              <div className="product_optionValue">
                <select className="productOption2" id="productOption2">
                  <option value={"*"}>[필수] SIZE 선택</option>
                  <option value={"**"}>-----------------</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div className="productInfo_bottom">
          <div className="product_btnWrap">
            <div className="buyNow_btn">
              <a>Buy Now</a>
            </div>
            <div className="addToCart_btn">
              <a>Add to Cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="productInfo_wrap2">
        <div className="productInfo_add">
          <div className="productInfo_add_container">
            <div className="productInfo_add_wrap">
              <a>Fabric & Care</a>
              <div className="productInfo_Fabric_Care_content"></div>
            </div>
            <div className="productInfo_add_wrap">
              <a>Size Detail</a>
              <div className="productInfo_Size_Detailcontent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
