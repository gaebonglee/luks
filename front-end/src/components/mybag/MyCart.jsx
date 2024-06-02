import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../style/mybag/MyCart.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";
import MyCartDeleteBtn from "./MyCartDeleteBtn";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

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
        console.log("Cart data:", response.data.products);
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

  const handleRemove = async (productId, colorId, sizeId) => {
    console.log(
      "Remove item - productId:",
      productId,
      "colorId:",
      colorId,
      "sizeId:",
      sizeId
    );
    try {
      await axios.post(
        `http://localhost:5000/cart/remove`,
        { product_id: productId, color_id: colorId, size_id: sizeId },
        { withCredentials: true }
      );
      setCart(
        cart.filter(
          (item) =>
            !(
              item.product_id === productId &&
              item.color_id === colorId &&
              item.size_id === sizeId
            )
        )
      );
    } catch (error) {
      console.error(
        "There was an error removing the item from the cart!",
        error
      );
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        cart.map(
          (item) => `${item.product_id}-${item.color_id}-${item.size_id}`
        )
      );
    }
  };

  const handleSelectItem = (productId, colorId, sizeId) => {
    const itemKey = `${productId}-${colorId}-${sizeId}`;
    if (selectedItems.includes(itemKey)) {
      setSelectedItems(selectedItems.filter((key) => key !== itemKey));
    } else {
      setSelectedItems([...selectedItems, itemKey]);
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
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length}
                onChange={handleSelectAll}
              />
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
            cart.map((product) => {
              const itemKey = `${product.product_id}-${product.color_id}-${product.size_id}`;
              return (
                <tr key={itemKey}>
                  <td className="mybag_checkbox_column">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(itemKey)}
                      onChange={() =>
                        handleSelectItem(
                          product.product_id,
                          product.color_id,
                          product.size_id
                        )
                      }
                    />
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
                    <div className="mybag_info_detailWrap">
                      <div className="mybag_info_detail">
                        <div className="mybag_info_detail name">
                          {product.p_name}
                        </div>
                        <p>{product.p_price.toLocaleString()}원</p>
                        <div className="mybag_info_detail_colorSize">
                          <a>색상: {product.color_name}</a>
                          <a>사이즈: {product.size}</a>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mybag_close_btn"
                      onClick={() =>
                        handleRemove(
                          product.product_id,
                          product.color_id,
                          product.size_id
                        )
                      }
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
              );
            })
          )}
        </tbody>
      </table>
      <MyCartDeleteBtn />
    </section>
  );
};

export default MyCart;
