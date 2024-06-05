import React from "react";

const MyHeart = () => {
  return (
    <section className="MyHeart_section">
      <div className="RecentOrders_title">
        <h3>최근주문</h3>
        <div>
          <a>더보기</a>
        </div>
      </div>
      <table className="RecentOrders_table">
        <thead>
          <tr className="RecentOrders_thead">
            <th className="date">주문일</th>
            <th className="history">주문내역</th>
            <th className="num">주문번호</th>
            <th className="amount">결제금액</th>
          </tr>
        </thead>
        <tbody>
          <tr className="RecentOrders_tbody">
            <td className="date">123123</td>
            <td className="history">
              <div className="img_box">
                <img src="" alt="상품 이미지" />
              </div>
              <div className="prd_order">
                <a>상품이름름름</a>
              </div>
            </td>
            <td className="num">주문번호</td>
            <td className="amount">결제금액</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default MyHeart;
