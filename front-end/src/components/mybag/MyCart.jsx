import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../style/mybag/MybagProducts.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    const fetchCart = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/cart/mycart`, {
          withCredentials: true,
        });
        setCart(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the cart!", error);
        setError("There was an error fetching the cart.");
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchCart();
  }, [isLoggedIn]);

  const handleRemove = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/cart/remove`,
        { product_id: productId },
        { withCredentials: true }
      );
      setCart(cart.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error(
        "There was an error removing the item from the cart!",
        error
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="mybag_section">
      <table className="mybag_table">
        <thead>
          <tr>
            <th className="mybag_checkbox_column">
              <input type="checkbox" />
            </th>
            <th>상품정보</th>
            <th className="mybag_quantity_column">수량</th>
            <th className="mybag_price_column">주문금액</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="4">장바구니가 비어 있습니다.</td>
            </tr>
          ) : (
            cart.map((product) => (
              <tr key={product.product_id}>
                <td className="mybag_checkbox_column">
                  <input type="checkbox" />
                </td>
                <td className="mybag_info_column">
                  <div className="mybag_info_image">
                    <Link
                      to={`/product/${encodeURIComponent(product.p_name)}/${
                        product.product_id
                      }`}
                    >
                      <img src={product.p_image_url} alt={product.p_name} />
                    </Link>
                  </div>
                  <div className="mybag_info_detail">
                    <div>{product.p_name}</div>
                    <div>{product.p_price.toLocaleString()}원</div>
                    <div>선택옵션</div>
                  </div>
                  <button
                    type="button"
                    className="mybag_close_btn"
                    onClick={() => handleRemove(product.product_id)}
                  >
                    <AiOutlineCloseSquare />
                  </button>
                </td>
                <td className="mybag_quantity_column">
                  <div className="mybag_quantity_wrap">
                    <button>-</button>
                    <input type="text" value={product.quantity} readOnly />
                    <button>+</button>
                  </div>
                </td>
                <td className="mybag_price_column">
                  <p>
                    {(product.p_price * product.quantity).toLocaleString()}원
                  </p>
                  <button>BUY NOW</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mybag_bottom">
        <button>선택상품 삭제</button>
        <button>품절상품 삭제</button>
      </div>
    </section>
  );
};

export default MyCart;
