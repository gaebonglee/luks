import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "../../style/mybag/CartItem.scss";

const CartItem = ({ product, isSelected, onToggleSelect, onRemove }) => {
  const itemKey = `${product.product_id}-${product.color_id}-${product.size_id}`;

  return (
    <>
      <td className="mybag_checkbox_column">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            onToggleSelect(
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
            <div className="mybag_info_detail name">{product.p_name}</div>
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
            onRemove(product.product_id, product.color_id, product.size_id)
          }
        >
          <AiOutlineCloseSquare />
        </button>
      </td>
    </>
  );
};

export default CartItem;
