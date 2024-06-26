import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/mypage/MyOrderList.scss";

const MyOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order/my-orders`,
          {
            withCredentials: true,
          }
        );

        const groupedOrders = response.data.orders.reduce((acc, order) => {
          const { order_id } = order;
          if (!acc[order_id]) {
            acc[order_id] = [];
          }
          acc[order_id].push(order);
          return acc;
        }, {});

        const sortedOrders = Object.values(groupedOrders).sort(
          (a, b) => b[0].order_id - a[0].order_id
        );

        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError("There was an error fetching the orders.");
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    fetchOrders();
    fetchUser();
  }, []);

  const handleOrderClick = (order) => {
    navigate("/mypage/my-order/detail", { state: { order } });
  };

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
                <th>배송비</th>
                <th>진행상태</th>
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
                orders.map((orderGroup, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleOrderClick(orderGroup)}>
                      <td colSpan="3">
                        <div className="MyOrderList_orderInfo">
                          <a>
                            <span>주문일자</span>
                            <span className="bold">
                              {new Date(
                                orderGroup[0].order_date
                              ).toLocaleDateString()}
                            </span>
                          </a>
                          <a>
                            <span>주문번호</span>
                            <span className="bold">
                              {orderGroup[0].order_id}
                            </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    {orderGroup.map((order) => (
                      <tr key={order.product_id}>
                        <td
                          className="MyOrderList_detailWrap"
                          onClick={() => handleOrderClick(orderGroup)}
                        >
                          <img src={order.p_image_url} alt="상품 이미지" />
                          <div className="MyOrderList_detail">
                            <div className="MyOrderList_detail name">
                              {order.p_name}
                            </div>
                            <div className="MyOrderList_detail colorSize">
                              <p>color : {order.color_name}</p>
                              <p>size : {order.size}</p>
                            </div>
                            <div className="MyOrderList_detail priceWrap">
                              <span>{order.price.toLocaleString()}원</span>
                              <span> / </span>
                              <span>수량 {order.quantity}개</span>
                            </div>
                          </div>
                        </td>
                        <td className="MyOrderList_shipping">
                          <p>무료배송</p>
                        </td>
                        <td className="MyOrderList_progress">
                          <p>{order.status}</p>
                        </td>
                      </tr>
                    ))}
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
