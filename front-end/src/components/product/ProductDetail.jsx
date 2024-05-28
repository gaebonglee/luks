import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setError("There was an error fetching the product details.");
      });
  }, [productId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductDetail_container">
      <div className="ProductDetail_wrap">
        <section className="productImg_section">
          <div>
            <img src={product.p_image_url} alt={product.p_name} />
          </div>
        </section>
        <section className="productInfo_section">
          <div className="productInfo_wrap1">
            <div className="productInfo_top">
              <div className="product_NamePrice">
                <p className="productName">{product.p_name}</p>
                <p className="productPrice">{product.p_price}원</p>
              </div>
              <div className="product_desc">
                <p>{product.p_info}</p>
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
