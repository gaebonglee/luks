import React from "react";
import "../../style/mybag/MybagProducts.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";

const MyBagProducts = () => {
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
          <tr>
            <td className="mybag_checkbox_column">
              <input type="checkbox" />
            </td>
            <td className="mybag_info_column">
              <div className="mybag_info_image">이미지</div>
              <div className="mybag_info_detail">
                <div>상품이름</div>
                <div>상품가격</div>
                <div>선택옵션</div>
              </div>
              <button type="button" className="mybag_close_btn">
                <AiOutlineCloseSquare />
              </button>
            </td>
            <td className="mybag_quantity_column">
              <div className="mybag_quantity_wrap">
                <button>-</button>
                <input type="text" />
                <button>+</button>
              </div>
            </td>
            <td className="mybag_price_column">
              <p>원</p>
              <button>BUY NOW</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mybag_bottom">
        <button>선택상품 삭제</button>
        <button>품절상품 삭제</button>
      </div>
    </section>
  );
};

export default MyBagProducts;
