import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../style/mypage/MyOrderList.scss";

const MyOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order/my-orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError("There was an error fetching the orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="right_section">
      <div className="MyOrderList">
        <h3>주문배송조회</h3>
        <div className="MyOrderList_contents">
          <table className="MyOrderList_table">
            <thead>
              <tr>
                <th>상품정보</th>
                <th>진행상태</th>
                <th>구매확정 및 리뷰</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="OrderListEmpty">
                    주문 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.order_id}>
                    <tr>
                      <td colSpan="3">
                        <div className="MyOrderList_orderInfo">
                          <a>
                            <span>주문일자</span>
                            <span className="bold">
                              {new Date(order.order_date).toLocaleDateString()}
                            </span>
                          </a>
                          <a>
                            <span>주문번호</span>
                            <span className="bold">{order.order_id}</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="MyOrderList_detailWrap">
                        <img src={order.p_image_url} alt="상품 이미지" />
                        <div className="MyOrderList_detail">
                          <div className="MyOrderList_detail name">
                            {order.p_name}
                          </div>
                          <div className="MyOrderList_detail colorSize">
                            <span>색상: {order.color_name}</span>
                            <span>사이즈: {order.size}</span>
                          </div>
                          <div className="MyOrderList_detail priceWrap">
                            <span>{order.price.toLocaleString()}원</span>
                            <span>/</span>
                            <span>수량 {order.quantity}개</span>
                          </div>
                        </div>
                      </td>
                      <td className="MyOrderList_progress">
                        <p>{order.status}</p>
                      </td>
                      <td className="MyOrderList_review">
                        <a>구매확정</a>
                        <a>리뷰작성</a>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyOrderList;
