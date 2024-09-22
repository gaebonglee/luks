import React from "react";
import axios from "axios";
import { useAsync } from "../../../types/useAsync";
import "../../../style/mypage/RecentOrders.scss";
import { IoIosArrowForward } from "react-icons/io";

interface Product {
  p_image_url: string;
  p_name: string;
}

interface Order {
  order_id: number;
  order_date: string;
  total_amount: number;
  products: Product[];
}

const fetchRecentOrders = async (): Promise<Order[]> => {
  const response = await axios.get(
    "http://localhost:5000/recentOrders/recent-orders",
    {
      withCredentials: true,
    }
  );

  // 데이터 내림차순 정렬
  return response.data.orders.sort(
    (a: Order, b: Order) => b.order_id - a.order_id
  );
};

const RecentOrders: React.FC = () => {
  const { loading, error, data: orders } = useAsync<Order[]>(fetchRecentOrders); // useAsync를 사용하여 데이터를 불러옴

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="RecentOrders_section">
      <div className="RecentOrders_title">
        <p>최근주문</p>
        <div className="listMore">
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
          {orders?.map((order) => (
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
