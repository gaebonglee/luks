import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../style/mypage/RecentOrders.scss";
import { IoIosArrowForward } from "react-icons/io";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recentOrders/recent-orders`,
          {
            withCredentials: true,
          }
        );
        console.log("Fetched Orders:", response.data.orders); // 데이터 구조 확인용 로그

        // 데이터 내림차순 정렬
        const sortedOrders = response.data.orders.sort(
          (a, b) => b.order_id - a.order_id
        );

        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the recent orders!", error);
        setError("There was an error fetching the recent orders.");
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="RecentOrders_section">
      <div className="RecentOrders_title">
        <h3>최근주문</h3>
        <div>
          <a href="mypage/my-order/list">더보기</a>
          <IoIosArrowForward />
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
          {orders.map((order) => (
            <tr key={order.order_id} className="RecentOrders_tbody">
              <td className="date">
                {new Date(order.order_date).toLocaleDateString()}
              </td>
              <td className="history">
                <div className="img_box">
                  <img
                    src={order.products?.[0]?.p_image_url}
                    alt="상품 이미지"
                  />
                </div>
                <div className="prd_order">
                  {order.products?.length === 1 ? (
                    <a>{order.products[0].p_name}</a>
                  ) : (
                    <a>
                      {order.products?.[0]?.p_name} 외{" "}
                      {order.products?.length - 1}개
                    </a>
                  )}
                </div>
              </td>
              <td className="num">{order.order_id}</td>
              <td className="amount">
                {order.total_amount.toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentOrders;
