import React, { useState } from "react";
import "../../../style/mypage/MyHeart.scss";
import { IoIosArrowForward } from "react-icons/io";

const MyHeart = () => {
  const [wishList, setWishList] = useState([]);
  return (
    <section className="MyHeart_section">
      <div className="MyHeart_title">
        <h3>MY HEART</h3>
        <div>
          <a>더보기</a>
          <IoIosArrowForward />
        </div>
      </div>
      <div className="MyHeart_artwrap">
        <h4>Products</h4>
        <ul className="MyHeart_thumbnail">
          {wishList.length === 0 ? (
            <div className="MyHeart_text">
              <p>위시리스트가 비어있습니다.</p>
            </div>
          ) : (
            <li>
              <div className="MyHeart_img">
                <img alt="이미지"/>
              </div>
              <div className="MyHeart_productName">ㄴㄴㄴ</div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default MyHeart;
