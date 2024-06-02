import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/mybag/MyCart.scss";
import CartItem from "./CartItem";
import CartQuantity from "./CartQuantity";
import MyCartBtn from "./MyCartBtn";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

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
        setError("There was an error fetching the cart.");
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchCart();
  }, [isLoggedIn]);

  const handleRemove = async (productId, colorId, sizeId) => {
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

  const handleQuantityChange = async (productId, colorId, sizeId, delta) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/cart/item-quantity",
        {
          params: {
            product_id: productId,
            color_id: colorId,
            size_id: sizeId,
          },
          withCredentials: true,
        }
      );

      const currentQuantity = response.data.quantity;
      const newQuantity = currentQuantity + delta;

      if (newQuantity > 0) {
        await axios.post(
          `http://localhost:5000/cart/add`,
          {
            product_id: productId,
            color_id: colorId,
            size_id: sizeId,
            quantity: delta,
          },
          { withCredentials: true }
        );

        setCart(
          cart.map((item) =>
            item.product_id === productId &&
            item.color_id === colorId &&
            item.size_id === sizeId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error("There was an error updating the quantity!", error);
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

  const handleRemoveSelected = async () => {
    try {
      await axios.post(
        `http://localhost:5000/cart/remove-multiple`,
        {
          items: selectedItems.map((item) => {
            const [product_id, color_id, size_id] = item.split("-");
            return { product_id, color_id, size_id };
          }),
        },
        { withCredentials: true }
      );

      setCart(
        cart.filter(
          (item) =>
            !selectedItems.includes(
              `${item.product_id}-${item.color_id}-${item.size_id}`
            )
        )
      );
      setSelectedItems([]);
    } catch (error) {
      console.error(
        "There was an error removing the selected items from the cart!",
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

  const handleCalculateTotal = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/calculate-total`,
        {
          items: selectedItems.map((item) => {
            const [product_id, color_id, size_id] = item.split("-");
            return { product_id, color_id, size_id };
          }),
        },
        { withCredentials: true }
      );
      return response.data.total_price;
    } catch (error) {
      console.error("There was an error calculating the total price!", error);
      return 0;
    }
  };

  const handleCheckout = () => {
    const selectedProductDetails = cart.filter((item) =>
      selectedItems.includes(
        `${item.product_id}-${item.color_id}-${item.size_id}`
      )
    );

    navigate("/checkout", { state: { selectedProductDetails } });
  };

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
                  <CartItem
                    product={product}
                    isSelected={selectedItems.includes(itemKey)}
                    onToggleSelect={handleSelectItem}
                    onRemove={handleRemove}
                  />
                  <CartQuantity
                    product={product}
                    onQuantityChange={handleQuantityChange}
                  />
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <MyCartBtn
        onRemoveSelected={handleRemoveSelected}
        calculateTotal={handleCalculateTotal}
        onCheckout={handleCheckout}
        selectedItems={selectedItems} 
      />
    </section>
  );
};

export default MyCart;
