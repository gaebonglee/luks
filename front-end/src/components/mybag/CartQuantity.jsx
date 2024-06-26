import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/mybag/CartQuantity.scss";

const CartQuantity = ({ product, onQuantityChange }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (delta) => {
    const newQuantity = product.quantity + delta;
    if (newQuantity > 0) {
      onQuantityChange(
        product.product_id,
        product.color_id,
        product.size_id,
        delta
      );
    }
  };

  const handleBuyNow = () => {
    const selectedProductDetails = [product];
    navigate("/checkout", { state: { selectedProductDetails } });
  };

  return (
    <>
      <td className="mybag_quantity_column">
        <div className="mybag_quantity_column style">
          <div className="mybag_quantity_wrap">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" value={product.quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>
      </td>
      <td className="mybag_price_column">
        <p>{(product.p_price * product.quantity).toLocaleString()}원</p>
        <button onClick={handleBuyNow}>BUY NOW</button>
      </td>
    </>
  );
};

export default CartQuantity;
