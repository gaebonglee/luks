import React from "react";
import axios from "axios";
import { useAsync } from "../../../types/useAsync";
import "../../../style/mypage/MyHeart.scss";
import { IoIosArrowForward } from "react-icons/io";


interface Product {
  product_id: number;
  p_image_url: string;
  p_name: string;
}

const fetchWishList = async (): Promise<Product[]> => {
  const myWishResponse = await axios.get(
    "http://localhost:5000/wishlist/mywish",
    {
      withCredentials: true,
    }
  );
  return myWishResponse.data.products;
};

const MyHeart: React.FC = () => {
  const { loading, error, data: wishList } = useAsync<Product[]>(fetchWishList);
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
          {wishList && wishList.length === 0 ? (
            <div className="MyHeart_text">
              <p>위시리스트가 비어있습니다.</p>
            </div>
          ) : (
            wishList?.map((product) => (
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
