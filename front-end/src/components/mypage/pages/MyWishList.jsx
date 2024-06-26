import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductWish from "../../../components/product/ProductWish";
import "../../../style/mywish/MyWishList.scss";

const MyWishList = () => {
  const [wishList, setWishList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    const fetchWishList = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/wishlist/mywish`,
          {
            withCredentials: true,
          }
        );
        setWishList(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the wishlist!", error);
        setError("There was an error fetching the wishlist.");
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchWishList();
  }, [isLoggedIn]);

  return (
    <section className="right_section">
      <div className="wish_productWrap">
        <ul className="thumbnail">
          {wishList.length === 0 ? (
            <div className="wishlist_text">
              <p>위시리스트가 비어있습니다.</p>
            </div>
          ) : (
            wishList.map((product) => (
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
                    <ProductWish productId={product.product_id} />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default MyWishList;
