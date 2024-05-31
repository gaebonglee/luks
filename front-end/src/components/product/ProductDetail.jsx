import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoAdd from "./InfoAdd";
import "../../style/product/ProductDetail.scss";

//아이콘
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { productName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [fabric, setFabric] = useState(null);
  const [care, setCare] = useState(null);
  const [sizeDetails, setSizeDetails] = useState([]);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태

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
        setLiked(response.data.product.is_liked); // 서버에서 초기 좋아요 상태를 받아올 경우
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setError("There was an error fetching the product details.");
      });
  }, [productName, productId]);

  const toggleLike = (productId) => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const url = newLikedStatus
      ? `http://127.0.0.1:5000/product/wishlist/add`
      : `http://127.0.0.1:5000/product/wishlist/remove`;

    axios
      .post(url, { member_id: "test1111", product_id: productId }) // member_id는 실제 로그인된 사용자 ID로 변경
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error updating the wishlist!", error);
        setLiked(!newLikedStatus); // 에러가 발생한 경우 상태 롤백
      });
  };

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
                <span
                  className="wishList_icon"
                  onClick={() => toggleLike(product.product_id)}
                >
                  {liked ? <FaHeart /> : <FiHeart />}
                </span>
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
