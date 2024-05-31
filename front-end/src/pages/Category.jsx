import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../style/product/Category.scss";

//아이콘
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Category = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState({}); // 좋아요 상태 관리

  useEffect(() => {
    let apiUrl = `http://127.0.0.1:5000/category/${category}`;
    if (subcategory) {
      apiUrl += `/${subcategory}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setError("There was an error fetching the product details.");
      });
  }, [category, subcategory]);

  const toggleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="contents">
      <div className="productWrap">
        <div className="productList_thumbnailWrap">
          <ul className="thumbnail">
            {products.map((product) => (
              <li key={product.product_id}>
                <div className="thumbnail_img">
                  <Link
                    to={`/product/${encodeURIComponent(product.p_name)}/${
                      product.product_id
                    }`}
                  >
                    <img src={product.p_image_url} alt={product.p_name} />
                  </Link>
                </div>
                <div className="thumbnail_info">
                  <p className="thumbnail_productName">
                    <Link
                      to={`/product/${encodeURIComponent(product.p_name)}/${
                        product.product_id
                      }`}
                    >
                      <span>{product.p_name.toLowerCase()}</span>
                    </Link>
                  </p>
                  <div className="thumbnail_productPrice">
                    {product.p_price.toLocaleString()}원
                  </div>
                  <div className="thumbnail_wish">
                    <p onClick={() => toggleLike(product.product_id)}>
                      {likedProducts[product.product_id] ? (
                        <FaHeart />
                      ) : (
                        <FiHeart />
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
