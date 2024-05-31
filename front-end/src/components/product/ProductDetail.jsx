import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoAdd from "./InfoAdd";
import ProductWish from "./ProductWish";
import "../../style/product/ProductDetail.scss";

const ProductDetail = () => {
  const { productName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [fabric, setFabric] = useState(null);
  const [care, setCare] = useState(null);
  const [sizeDetails, setSizeDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/product/${productName}/${productId}`)
      .then((response) => {
        setProduct(response.data.product);
        setColors(response.data.colors);
        setSizes(response.data.sizes);
        if (response.data.fabricAndCare) {
          setFabric(response.data.fabricAndCare.fabric);
          setCare(response.data.fabricAndCare.care);
        }
        setSizeDetails(response.data.sizeDetails);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setError("There was an error fetching the product details.");
      });
  }, [productName, productId]);

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
          <div className="productInfo_wrap">
            <div className="productInfo_top">
              <div className="product_header">
                <div className="product_NamePrice">
                  <p className="productName">{product.p_name}</p>
                  <p className="productPrice">
                    {Number(product.p_price).toLocaleString()}원
                  </p>
                </div>
                <ProductWish productId={product.product_id} />
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
                      {colors.map((color) => (
                        <option key={color.color_id} value={color.color_name}>
                          {color.color_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
                <li className="product_sizeOption">
                  <label>SIZE</label>
                  <div className="product_optionValue">
                    <select className="productOption2" id="productOption2">
                      <option value={"*"}>[필수] SIZE 선택</option>
                      {sizes.map((size) => (
                        <option key={size.size_id} value={size.size}>
                          {size.size}
                        </option>
                      ))}
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
            <InfoAdd fabric={fabric} care={care} sizeDetails={sizeDetails} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
