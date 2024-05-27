import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/product/ProductDetail.scss";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 백엔드에서 데이터를 가져오는 함수
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 함수 호출
    fetchProductDetail();
  }, []);

  return (
    <div className="ProductDetail_container">
      <div className="ProductDetail_wrap">
        <section className="productImg_section">
          <div>
            {product && <img src={product.p_image_url} alt="Product" />}
          </div>
        </section>
        <section className="productInfo_section">
          <div className="productInfo_wrap1">
            <div className="productInfo_top">
              <div className="product_NamePrice">
                <p className="productName">{product && product.p_name}</p>
                <p className="productPrice">{product && product.p_price}원</p>
              </div>
              <div className="product_desc">
                <p>{product && product.p_info}</p>
              </div>
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
      </div>
    </div>
  );
};

export default ProductDetail;
