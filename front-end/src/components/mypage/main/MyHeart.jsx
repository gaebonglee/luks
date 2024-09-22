import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../style/mypage/MyHeart.scss";
import { IoIosArrowForward } from "react-icons/io";

const MyHeart = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/wishlist/mywish`, {
          withCredentials: true,
        });
        setWishList(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the wishlist!", error);
        setError("There was an error fetching the wishlist.");
        setLoading(false);
      }
    };

    fetchWishList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="MyHeart_section">
      <div className="MyHeart_title">
        <p>MY HEART</p>
        <div className="listMore">
          <a href="/mypage/mywish">더보기</a>
          <IoIosArrowForward />
        </div>
      </div>
      <div className="MyHeart_artwrap">
        <ul className="MyHeart_thumbnail">
          {wishList.length === 0 ? (
            <div className="MyHeart_text">
              <p>위시리스트가 비어있습니다.</p>
            </div>
          ) : (
            wishList.map((product) => (
              <li key={product.product_id}>
                <div className="MyHeart_img">
                  <img src={product.p_image_url} alt={product.p_name} />
                </div>
                <div className="MyHeart_productName">{product.p_name}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default MyHeart;
